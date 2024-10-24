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
import { generateInviteCode } from '@/hook/generate-invite-code'
import { type GetMembers } from '@/module/academyMember/model'
import { createClassAction } from '@/module/academyClass/action'

interface ClassCreateFormProps {
	academyId: string
	members: GetMembers[]
}

export function ClassCreateForm({
	academyId,
	members
}: ClassCreateFormProps) {
	const inviteCode = generateInviteCode(10)

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [selectedMembers, setSelectedMembers] = useState<
		string[]
	>([]) // string 배열로 변경

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

	const createClass = useAction(createClassAction, {
		onSuccess: () => {
			toast({
				title: '새 그룹을 추가했어요',
				description: '추가한 그룹에 강의를 등록해 보세요',
				variant: 'positive'
			})
			router.push(`/academy/${academyId}/student`)
		},
		onError: (error) => {
			toast({
				title: '그룹 생성에 실패했습니다',
				variant: 'negative'
			})
			console.error(error)
		}
	})

	const goBack = () => {
		router.back()
	}

	const handleMemberChange = (selectedValues: string[]) => {
		setSelectedMembers(selectedValues)
	}

	const handleCreateClass = () => {
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

		createClass.execute({
			academyId,
			name,
			description,
			inviteCode,
			academyMemberId: selectedMembers
		})
	}

	return (
		<div className="max-pc:justify-start mx-auto flex h-screen max-w-[640px] flex-col justify-center gap-10 p-4">
			<div className="max-pc:hidden flex justify-between">
				<div className="text-2xl font-semibold">
					학생 그룹 생성하기
				</div>
				<Icon
					name="CloseFill"
					className="h-8 w-8 hover:cursor-pointer"
					onClick={goBack}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">그룹 이름</div>
				<Input
					placeholder="그룹 이름을 입력해주세요"
					onChange={handleNameChange}
					value={name}
					required
				/>
			</div>

			<div className="flex flex-col gap-2">
				<div className="text-base font-semibold">담당 강사</div>
				<Combobox
					data={members.map((member) => ({
						label: `${member.user?.name || ''} (${member.phoneNumber})`,
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
					placeholder="이 그룹에 대해 간략하게 설명해 주세요"
					onChange={handleDescriptionChange}
					className="border-border-strong"
					value={description}
				/>
			</div>
			<Button onClick={handleCreateClass}>완료</Button>
		</div>
	)
}
