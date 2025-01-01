'use client'

import { Button, toast } from '@design-system/ui'
import { useAction } from '@core/react'
import { useRouter } from 'next/navigation'
import { type GetStudents } from '@/module/student/model'
import {
	deviceChangeReasonUpdateAction,
	deviceUpdateAction
} from '@/module/user/action'

interface DeviceChangeRequestObjType {
	student: GetStudents
	deviceChangeRequest: {
		deviceToChange: string
		deviceType: string
		reason: string
	}
}

export function DeviceChangeReasonCard({
	requestObj
}: {
	requestObj: DeviceChangeRequestObjType
}) {
	const router = useRouter()

	const acceptDeviceChange = useAction(deviceUpdateAction, {
		onSuccess: () => {
			toast({
				title: '기기 변경 요청 승인 완료',
				description: '해당 기기로의 접속을 허용했어요',
				variant: 'positive'
			})
			removeRequest.execute({ device_change_reason: '' })
		},
		onError: () => {
			toast({
				title: '기기 변경 요청 승인 실패',
				description:
					'다시 시도하거나 계속하여 실패할 경우 관라자에게 문의해주세요',
				variant: 'negative'
			})
		}
	})

	const removeRequest = useAction(
		deviceChangeReasonUpdateAction,
		{
			onSuccess: () => router.refresh(),
			onError: () => {
				toast({
					title: '기기 변경 요청 완료 처리 오류',
					description:
						'다시 시도하거나 계속하여 실패할 경우 관라자에게 문의해주세요',
					variant: 'negative'
				})
			}
		}
	)

	const handleAcceptDeviceChange = () => {
		const userInfo = requestObj.student.user

		const device = requestObj.deviceChangeRequest
		const deviceType = device.deviceType
		const deviceToChange = device.deviceToChange

		const deviceUpdateDto = {
			device1:
				deviceType === 'mobile'
					? deviceToChange
					: userInfo?.device1 || '',
			device2:
				deviceType === 'tablet'
					? deviceToChange
					: userInfo?.device2 || '',
			device3:
				deviceType === 'pc'
					? deviceToChange
					: userInfo?.device3 || ''
		}

		acceptDeviceChange.execute(deviceUpdateDto)
	}

	const rejectDeviceChange = useAction(
		deviceChangeReasonUpdateAction,
		{
			onSuccess: () => {
				toast({
					title: '기기 변경 요청 거절 완료',
					description: '해당 기기로의 접속을 거절했어요',
					variant: 'positive'
				})
			},
			onError: () => {
				toast({
					title: '기기 변경 요청 거절 실패',
					description:
						'다시 시도하거나 계속하여 실패할 경우 관라자에게 문의해주세요',
					variant: 'negative'
				})
			}
		}
	)

	const handleRejectDeviceChange = () => {
		rejectDeviceChange.execute({ device_change_reason: '' })
	}

	return (
		<div className="flex gap-5 px-5 py-1">
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-2">
					<div className="text-md font-semibold">
						{requestObj.student.user?.name}
					</div>
				</div>
				<p className="text-secondary-foreground min-w-[300px] text-xs">
					{`변경 희망 기기 : ${requestObj.deviceChangeRequest.deviceToChange}`}
					<br />
					{`기기 분류 : ${requestObj.deviceChangeRequest.deviceType}`}
				</p>
			</div>

			{/* 구분선 */}
			<div className="h-full w-[0.7px] bg-gray-400" />

			<div className="flex w-full items-center">
				<div className="mx-4 whitespace-nowrap text-sm font-medium">
					기기 <br />
					변경 사유
				</div>
				<p className="text-secondary-foreground mx-2 w-full text-xs">
					{requestObj.deviceChangeRequest.reason}
				</p>
			</div>

			<div className="flex gap-2 whitespace-nowrap">
				<Button
					size="sm"
					variant="default"
					onClick={handleAcceptDeviceChange}
				>
					승인
				</Button>
				<Button
					size="sm"
					variant="secondary"
					onClick={handleRejectDeviceChange}
				>
					거절
				</Button>
			</div>
		</div>
	)
}
