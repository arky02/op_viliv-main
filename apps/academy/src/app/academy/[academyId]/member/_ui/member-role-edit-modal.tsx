'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useAction } from '@core/react'
import { type AcademyMemberRole } from '@core/models'
import { useState } from 'react'
import { updateMemberRoleAction } from '@/module/academyMember/action'

interface MemberRoleEditModalProps {
	academyMemberId: string
	memberRole: AcademyMemberRole
}

export function MemberRoleEditModal({
	academyMemberId,
	memberRole
}: MemberRoleEditModalProps): JSX.Element {
	const [open, setOpen] = useState(false)

	const [updatedMemberRole, setUpdatedMemberRole] =
		useState<AcademyMemberRole>(memberRole)

	const updateMemberRole = useAction(
		updateMemberRoleAction,
		{
			onSuccess: () => {
				toast({
					title: '권한 변경에 성공했습니다',
					variant: 'positive'
				})
				setOpen(false)
			},
			onError: () => {
				toast({
					title: '권한 변경에 실패했습니다',
					variant: 'negative'
				})
			}
		}
	)

	const handleSubmit = () => {
		updateMemberRole.execute({
			academyMemberId,
			role: updatedMemberRole
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					size="sm"
					variant="secondary"
					className="max-pc:w-full"
				>
					권한 설정
				</Button>
			</DialogTrigger>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">
						사용자 권한 설정하기
					</h1>
					<DialogClose>
						<Icon name="CloseLine" />
					</DialogClose>
				</div>
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-2">
						<div className="text-base font-semibold">
							사용자 권한
						</div>
						<Select
							onValueChange={(value) =>
								setUpdatedMemberRole(value as AcademyMemberRole)
							}
						>
							<SelectTrigger>
								<SelectValue
									placeholder={
										updatedMemberRole === 'MANAGER'
											? '관리자'
											: '강사'
									}
									className="text-foreground"
								/>{' '}
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="MANAGER">관리자</SelectItem>
								<SelectItem value="TEACHER">강사</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Button onClick={handleSubmit}>저장하기</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
