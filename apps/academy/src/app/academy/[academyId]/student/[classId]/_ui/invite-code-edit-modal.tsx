'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	Input,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useState } from 'react'
import { useAction } from '@core/react'
import { updateInviteCodeAction } from '@/module/academyClass/action'

export function InviteCodeEditModal({
	inviteCode,
	academyClassId
}: {
	inviteCode: string
	academyClassId: string
}): JSX.Element {
	const [open, setOpen] = useState(false)

	const [newInviteCode, setNewInviteCode] =
		useState(inviteCode)
	const [errorMessage, setErrorMessage] = useState<
		string | null
	>(null)

	const handleInviteCodeChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const filteredValue = e.target.value.replace(
			/[^A-Za-z0-9]/g,
			''
		)
		const limitedValue = filteredValue.substring(0, 10)
		setNewInviteCode(limitedValue)
		setErrorMessage(null)
	}

	const updateInviteCode = useAction(
		updateInviteCodeAction,
		{
			onSuccess: () => {
				toast({
					title: '초대 코드를 변경했습니다',
					variant: 'positive'
				})
				setOpen(false)
				setErrorMessage(null)
			},
			onError: (error) => {
				setErrorMessage(
					'잘못된 초대 코드예요. 정확한 코드를 입력했는지 확인해 주세요.'
				)
			}
		}
	)

	const handleSubmit = () => {
		updateInviteCode.execute({
			academyClassId,
			inviteCode: newInviteCode.toUpperCase()
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm">관리하기</Button>
			</DialogTrigger>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">
						변경할 초대 코드를 입력해 주세요
					</h1>
					<DialogClose>
						<Icon name="CloseLine" />
					</DialogClose>
				</div>
				<div className="flex flex-col gap-8">
					<div className="bg-secondary text-secondary-foreground gap-1 rounded-lg px-6 py-4">
						<div className="text-sm font-medium">
							현재 초대 코드
						</div>
						<div className="text-lg font-bold">{inviteCode}</div>
					</div>
					<div>
						<div>변경할 초대 코드</div>
						<Input
							value={newInviteCode}
							onChange={handleInviteCodeChange}
							className="uppercase"
							maxLength={10}
						/>
						{errorMessage ? (
							<p className="text-negative mt-2 text-sm font-medium">
								{errorMessage}
							</p>
						) : null}
					</div>
					<Button onClick={handleSubmit}>변경하기</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
