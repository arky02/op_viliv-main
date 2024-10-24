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
import { useState, type ChangeEvent } from 'react'
import { useAction } from '@core/react'
import { useRouter } from 'next/navigation'
import { type GetAcademies } from '@/module/academy/model'
import { createStudentAction } from '@/module/student/action'
import { type GetMyUserInfo } from '@/module/user/model'
import { verifyInviteCodeAction } from '@/module/academyClass/action'
import { AcademyModalCard } from './academy-modal-card'

interface InviteMemberModalProps {
	academy: GetAcademies
	userInfo: GetMyUserInfo
}

export function InviteMemberModal({
	academy,
	userInfo
}: InviteMemberModalProps): JSX.Element {
	const [inviteCode, setInviteCode] = useState('')

	const handleInviteCodeChange = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const filteredValue = e.target.value.replace(
			/[^A-Za-z0-9]/g,
			''
		)
		const limitedValue = filteredValue.substring(0, 10)
		setInviteCode(limitedValue)
	}

	const router = useRouter()

	const verifyInviteCode = useAction(
		verifyInviteCodeAction,
		{
			onSuccess: (response) => {
				console.log('verifyInviteCode response:', response)
				handleCreateStudent(
					response.data?.academyId ?? '',
					response.data?.id ?? ''
				)
			},
			onError: (error) => {
				console.error(error)
			}
		}
	)

	const inviteStudent = useAction(createStudentAction, {
		onSuccess: () => {
			toast({
				title: '학생 초대 성공',
				variant: 'positive'
			})
			router.push('/academy')
		},
		onError: (error) => {
			toast({
				title: '학생 초대 실패',
				variant: 'negative'
			})
			console.error(error)
		}
	})
	const handleVerifyInviteCode = () => {
		verifyInviteCode.execute({
			academyId: academy.id,
			inviteCode: inviteCode.toUpperCase()
		})
	}

	const handleCreateStudent = (
		academyId: string,
		academyClassId: string
	) => {
		if (!academyId || !academyClassId) {
			console.error('Invalid academyId or academyClassId')
			return
		}

		inviteStudent.execute({
			academyId,
			phoneNumber: userInfo.phoneNumber,
			academyClassId,
			userId: userInfo.id
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" className="h-fit">
					요청하기
				</Button>
			</DialogTrigger>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">
						초대 코드를 입력해 주세요
					</h1>
					<DialogClose>
						<Icon name="CloseLine" />
					</DialogClose>
				</div>
				<div className="flex flex-col gap-8">
					<AcademyModalCard academy={academy} />
					<div className="flex flex-col gap-2">
						<div className="text-base font-semibold">
							초대 코드
						</div>
						<Input
							onChange={handleInviteCodeChange}
							placeholder="초대 코드를 입력해 주세요"
							value={inviteCode}
							className="uppercase"
							maxLength={10}
						/>
					</div>
					<DialogClose>
						<Button
							size="lg"
							className="w-full"
							onClick={handleVerifyInviteCode}
						>
							요청하기
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	)
}
