'use client'

import {
	Select,
	SelectTrigger,
	SelectContent,
	Calendar,
	Combobox
} from '@design-system/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { type GetMembers } from '@/module/academyMember/model'

interface LectureFilterProps {
	members: GetMembers[]
}

interface DateRange {
	from: Date | undefined
	to?: Date | undefined
}

function LectureFilter({ members }: LectureFilterProps) {
	const memberNameListForCombobox = members.map((member) => {
		return {
			label: member.user?.name || '',
			value: member.id
		}
	})

	const router = useRouter()
	const searchParams = useSearchParams()

	const parseDate = (
		param: string | null
	): Date | undefined => {
		return param ? new Date(param) : undefined
	}

	const [selectedRange, setSelectedRange] =
		useState<DateRange>({
			from: parseDate(searchParams.get('startDate')),
			to: parseDate(searchParams.get('endDate'))
		})

	const formatDate = (date: Date) => {
		const year = date.getFullYear()
		const month = (date.getMonth() + 1)
			.toString()
			.padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const handleSelectDate = (
		range: DateRange | undefined
	) => {
		const query = new URLSearchParams(searchParams)
		if (range?.from) {
			query.set('startDate', formatDate(range.from))
		} else {
			query.delete('startDate')
		}

		if (range?.to) {
			query.set('endDate', formatDate(range.to))
		} else {
			query.delete('endDate')
		}

		setSelectedRange(
			range || { from: undefined, to: undefined }
		)

		router.push(`?${query.toString()}`)
	}

	const handleSelectMember = (selectedMember?: string[]) => {
		const query = new URLSearchParams(searchParams)
		if (selectedMember) {
			query.set('memberId', selectedMember[0] || '')
		} else {
			query.delete('memberId')
		}
		router.push(`?${query.toString()}`)
	}

	return (
		<div className="bg-background pc:px-[120px] flex justify-between border-b p-4">
			<div className="max-pc:justify-between flex w-full flex-1 gap-2">
				<Select>
					<SelectTrigger className="border-border pc:w-[260px] w-full">
						{!selectedRange.from || !selectedRange.to ? (
							'날짜 범위 선택'
						) : (
							<div className="text-foreground">{`${selectedRange.from.toLocaleDateString('ko-KR')} - ${selectedRange.to.toLocaleDateString('ko-KR')}`}</div>
						)}
					</SelectTrigger>
					<SelectContent>
						<Calendar
							mode="range"
							selected={selectedRange}
							onSelect={handleSelectDate}
						/>
					</SelectContent>
				</Select>
				<div className="pc:w-[240px] w-full">
					<Combobox
						data={memberNameListForCombobox}
						onValueChange={handleSelectMember}
						placeholder="강사 선택"
						searchPlaceholder="강사 검색"
					/>
				</div>
			</div>
		</div>
	)
}

export { LectureFilter }
