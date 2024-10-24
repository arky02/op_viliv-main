'use client'

import { Icon } from '@design-system/icon'
import {
	Button,
	Input,
	Textarea,
	toast,
	Combobox
} from '@design-system/ui'
import { useState } from 'react'
import { useAction } from '@core/react'
import { useRouter } from 'next/navigation'
import { type GetMembers } from '@/module/academyMember/model'
import { type GetClassInfo } from '@/module/academyClass/model'
import { updateClassAction } from '@/module/academyClass/action'

interface ClassEditFormProps {
	members: GetMembers[]
	classInfo: GetClassInfo
}

export function ClassEditForm({
	members,
	classInfo
}: ClassEditFormProps) {
	const [name, setName] = useState(classInfo.name)
	const [description, setDescription] = useState(
		classInfo.description || ''
	)
	const initialSelectedMembers = members.map(
		(member) => member.id
	)
	const [selectedMembers, setSelectedMembers] = useState<
		string[]
	>(initialSelectedMembers)

	const router = useRouter()

	const handleNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setName(e.target.value)
	}

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value)
	}

	const updateClass = useAction(updateClassAction, {
		onSuccess: () => {
			toast({
				title: '그룹 정보가 수정되었습니다',
				variant: 'positive'
			})

			router.push(
				`/academy/${classInfo.academyId}/student/${classInfo.id}/lecture`
			)
		},
		onError: (error) => {
			toast({
				title: '그룹 수정에 실패했습니다',
				variant: 'negative'
			})
			console.error(error)
		}
	})

	const handleMemberChange = (selectedValues: string[]) => {
		setSelectedMembers(selectedValues)
	}

	const handleUpdateClass = () => {
		if (!name.trim()) {
			toast({
				title: '그룹 이름을 입력해주세요',
				variant: 'negative'
			})
			return
		}

		if (selectedMembers.length === 0) {
			toast({
				title: '담당 강사를 선택해주세요',
				variant: 'negative'
			})
			return
		}

		updateClass.execute({
			classId: classInfo.id,
			name,
			description,
			academyMemberId: selectedMembers
		})
	}

	const goBack = () => {
		router.back()
	}

	return (
		<div className="max-pc:justify-start mx-auto flex h-screen max-w-[640px] flex-col justify-center gap-10 p-4">
			<div className="max-pc:hidden flex justify-between">
				<div className="text-2xl font-semibold">
					학생 그룹 수정하기
				</div>
				<Icon
					name="CloseFill"
					className="h-8 w-8 hover:cursor-pointer"
					onClick={goBack}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">그룹 이름</div>
				<Input value={name} onChange={handleNameChange} />
			</div>

			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">담당 강사</div>
				<Combobox
					data={members.map((member) => ({
						label: member.user?.name || '',
						value: member.id
					}))}
					defaultValue={selectedMembers}
					emptyPlaceholder="검색 결과가 없어요..."
					multiple
					onValueChange={handleMemberChange}
					placeholder="강사를 선택해 주세요"
					searchPlaceholder="강사 검색"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">
					그룹 설명(선택)
				</div>
				<Textarea
					onChange={handleDescriptionChange}
					value={description}
					className="border-border-strong"
				/>
			</div>
			<Button onClick={handleUpdateClass}>완료</Button>
		</div>
	)
}
