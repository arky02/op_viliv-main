'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useAction } from '@core/react'
import { removeMemberAction } from '@/module/academyMember/action'

export function MemberRemoveModal({
	academyMemberId
}: {
	academyMemberId: string
}): JSX.Element {
	const removeMember = useAction(removeMemberAction, {
		onSuccess: () => {
			toast({
				title: '사용자를 내보냈습니다.',
				variant: 'positive'
			})
		},
		onError: () => {
			toast({
				title: '사용자 내보내기에 실패했습니다',
				variant: 'negative'
			})
		}
	})

	const handleSubmit = () => {
		removeMember.execute(academyMemberId)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="sm"
					variant="secondary"
					className="max-pc:w-full"
				>
					내보내기
				</Button>
			</DialogTrigger>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="pc:px-6 flex flex-col items-center justify-center gap-6 px-5 py-10">
					<Icon
						name="ErrorWarningFill"
						size="80"
						className="text-primary"
					/>
					<div className="flex flex-col items-center justify-center gap-1 text-center">
						<div className="text-xl font-semibold">
							해당 사용자를 정말 내보내시겠어요?
						</div>
						<div className="text-secondary-foreground text-lg font-medium">
							한 번 내보내면 되돌릴 수 없어요
						</div>
					</div>
					<div className="flex gap-2">
						<DialogClose>
							<Button variant="secondary">취소</Button>
						</DialogClose>
						<Button onClick={handleSubmit}>내보내기</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
