'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useState, type ChangeEvent } from 'react'
import { useAction } from '@core/react'
import { type AcademyMemberRole } from '@core/models'
import { inviteMemberAction } from '@/module/academyMember/action'

interface InviteMemberModalProps {
	academyId: string
}

interface InviteField {
	phoneNumber?: string | undefined
	role?: AcademyMemberRole | undefined
}

const formatPhoneNumber = (phoneNumber: string): string => {
	const cleaned = phoneNumber.replace(/\D/g, '')
	const match =
		/^(?<part1>\d{3})(?<part2>\d{0,4})(?<part3>\d{0,4})$/.exec(
			cleaned
		)

	if (match?.groups) {
		const {
			part1 = '',
			part2 = '',
			part3 = ''
		} = match.groups
		if (part3) {
			return `${part1}-${part2}-${part3}`
		} else if (part2) {
			return `${part1}-${part2}`
		}
		return part1
	}
	return cleaned
}

export function InviteMemberModal({
	academyId
}: InviteMemberModalProps): JSX.Element {
	const [fields, setFields] = useState<InviteField[]>([
		{ phoneNumber: '010-', role: 'TEACHER' }
	])
	const [modalOpen, setModalOpen] = useState(false)

	const addField = () => {
		setFields([
			...fields,
			{ phoneNumber: '010-', role: 'TEACHER' }
		])
	}

	const removeField = (index: number) => {
		if (fields.length > 1) {
			setFields(fields.filter((_, i) => i !== index))
		}
	}

	const handlePhoneNumberChange = (
		index: number,
		phoneNumber: string
	) => {
		// 마스킹된 전화번호로 업데이트
		const formattedPhoneNumber =
			formatPhoneNumber(phoneNumber)
		const updatedFields = [...fields]
		updatedFields[index] = {
			...updatedFields[index],
			phoneNumber: formattedPhoneNumber
		}
		setFields(updatedFields)
	}

	const handleRoleChange = (
		index: number,
		role: AcademyMemberRole
	) => {
		const updatedFields = [...fields]
		updatedFields[index] = { ...updatedFields[index], role }
		setFields(updatedFields)
	}

	const inviteAction = useAction(inviteMemberAction, {
		onSuccess: () => {
			toast({
				title: '강사 초대를 완료했어요',
				description:
					'초대된 강사에게 알림톡 메시지를 발송했어요',
				variant: 'positive'
			})
		},
		onError: (error) => {
			toast({
				title: '강사 초대에 실패했어요',
				variant: 'negative'
			})
			console.error(error)
		}
	})

	const handleInvite = () => {
		fields.forEach((field) => {
			if (field.phoneNumber && field.role) {
				// 액션 호출 시에는 대시를 제거한 숫자만 전송
				const cleanedPhoneNumber = field.phoneNumber.replace(
					/-/g,
					''
				)

				inviteAction.execute({
					academyId,
					phoneNumber: cleanedPhoneNumber,
					role: field.role
				})
			}
		})

		setModalOpen(false)
	}

	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="max-pc:hidden">
					초대하기
				</Button>
			</DialogTrigger>
			<DialogContent hideClose>
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">
						강사 초대하기
					</h1>
					<DialogClose>
						<Icon name="CloseLine" />
					</DialogClose>
				</div>
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-2">
						{fields.map((field, index) => (
							<div key={index} className="flex items-center gap-4">
								<Input
									placeholder="전화번호"
									value={field.phoneNumber}
									maxLength={13}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										handlePhoneNumberChange(index, e.target.value)
									}
								/>
								<Select
									onValueChange={(role) =>
										handleRoleChange(index, role as AcademyMemberRole)
									}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="권한" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="TEACHER">강사</SelectItem>
										<SelectItem value="MANAGER">관리자</SelectItem>
									</SelectContent>
								</Select>
								{fields.length > 1 && (
									<Button
										size="sm"
										variant="secondary"
										onClick={() => removeField(index)}
										className="h-12 w-12"
									>
										<Icon name="DeleteBin5Fill" size={20} />
									</Button>
								)}
							</div>
						))}
						<Button
							size="sm"
							variant="secondary"
							className="mt-2 w-fit"
							onClick={addField}
						>
							+ 초대할 사용자 추가
						</Button>
					</div>
					<Button
						onClick={handleInvite}
						disabled={inviteAction.isExecuting}
					>
						초대하기
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
