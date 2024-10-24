'use client'

import { Icon } from '@design-system/icon'
import Image from 'next/image'
import Link from 'next/link'
import { Button, toast } from '@design-system/ui'
import { useState } from 'react'
import { useAction } from '@core/react'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { type GetAcademies } from '@/module/academy/model'
import {
	acceptAcademyMemberAction,
	removeMemberAction
} from '@/module/academyMember/action'

interface AcademyCardProps {
	academy: GetAcademies
	userId: string
}

export function AcademyCard({
	academy,
	userId
}: AcademyCardProps) {
	const currentMember = academy.academyMembers.find(
		(member) => member.user?.id === userId
	)

	const [isPending, setIsPending] = useState(
		currentMember?.isPending
	)

	const AcceptMemberAction = useAction(
		acceptAcademyMemberAction,
		{
			onSuccess: () => {
				toast({
					title: '학원 초대를 수락했습니다',
					variant: 'positive'
				})
			},
			onError: () => {
				toast({
					title: '학원 초대 수락에 실패했습니다',
					variant: 'negative'
				})
			}
		}
	)

	const RemoveMemberAction = useAction(removeMemberAction, {
		onSuccess: () => {
			toast({
				title: '학원 초대를 거절했습니다',
				variant: 'positive'
			})
		},
		onError: () => {
			toast({
				title: '학원 초대 거절에 실패했습니다',
				variant: 'negative'
			})
		}
	})

	const getMemberId = (): string | undefined => {
		const member = academy.academyMembers.find(
			(academyMember) => academyMember.user?.id === userId
		)
		return member?.id
	}

	const handleAccept = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.stopPropagation()
		const memberId = getMemberId()

		if (memberId) {
			AcceptMemberAction.execute(memberId)
		} else {
			alert('멤버 정보가 없습니다.')
		}
	}

	const handleRemove = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		console.log(e)
		e.stopPropagation()
		const memberId = getMemberId()

		if (memberId) {
			RemoveMemberAction.execute(memberId)
		} else {
			alert('멤버 정보가 없습니다.')
		}
	}

	// `isPending` 상태에 따라 Link 또는 단순 div를 렌더링
	const CardContent = (
		<div
			className={`bg-background flex flex-col gap-5 rounded-xl border p-6 shadow ${isPending ? 'text-muted-foreground' : ''}`}
		>
			<div className="flex justify-between">
				<Image
					src={academy.image || defaultImage}
					alt="img"
					className="h-[60px] w-[60px] rounded-lg border-4 object-cover"
					width={60}
					height={60}
				/>
				{isPending ? (
					<div className="flex h-fit gap-2">
						<Button
							size="sm"
							onClick={handleAccept}
							variant="secondary"
						>
							수락
						</Button>
						<Button
							size="sm"
							onClick={handleRemove}
							variant="secondary"
						>
							거절
						</Button>
					</div>
				) : null}
			</div>
			<div className="flex justify-between gap-4">
				<div className="flex w-full flex-col gap-2">
					<div className="text-lg font-semibold">
						{academy.name}
					</div>
					<div className="flex justify-between">
						<div
							className={`text-sm font-medium ${isPending ? 'text-muted-foreground' : 'text-secondary-foreground'}`}
						>
							<div>{academy.academyMembers[0]?.user?.name}</div>
							<div>
								{`${academy.address} ${academy.addressDetail}`}
							</div>
						</div>
						<div className="bg-secondary flex items-center justify-center gap-2 rounded-lg p-4">
							<Icon
								name="UserFill"
								className="text-muted-foreground h-5 w-5"
							/>
							<div className="text-secondary-foreground text-base font-medium">
								{academy.academyClasses.length}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	return isPending ? (
		<div>{CardContent}</div>
	) : (
		<Link href={`/academy/${academy.id}/student`} passHref>
			{CardContent}
		</Link>
	)
}
