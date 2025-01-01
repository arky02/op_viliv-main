'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	Textarea,
	toast
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useAction } from '@core/react'
import { useDialogStore } from '@core/react/zustand/dialog-store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	deviceChangeReasonUpdateAction,
	deviceUpdateAction
} from '@/module/user/action'
import { getDeviceInfo, getDeviceType } from '../utils'

interface DeviceControlModalProps {
	academyId: string
	selectedAcademyId: string
	device: { mobile: string; tablet: string; pc: string }
	deviceChangeReason: string
}

const MODAL_TITLE_TEXT = {
	init: '',
	verifying: '등록된 기기로만 열람이 가능합니다',
	validateSuccess: '기기 검증 성공',
	validateFail: '기기 검증 실패',
	requestUpdate: '기기 변경 사유 입력',
	requestQueued: '기기 변경 사유 제출 완료'
}

const MODAL_BUTTON_TEXT = {
	init: '',
	verifying: '계속하기',
	validateSuccess: '확인',
	validateFail: '기기 변경 사유 입력',
	requestUpdate: '사유 입력 제출',
	requestQueued: '확인'
}

export function DeviceControlModal({
	device: registeredDevice,
	academyId,
	deviceChangeReason,
	selectedAcademyId
}: DeviceControlModalProps): JSX.Element {
	const { isDeviceControlModalOpened, toggleDialog } =
		useDialogStore()

	const router = useRouter()

	const [currState, setCurrState] = useState<
		| 'init'
		| 'verifying'
		| 'validateSuccess'
		| 'validateFail'
		| 'requestUpdate'
		| 'requestQueued'
	>('init')

	const [currentDeviceType, setCurrentDeviceType] = useState<
		'mobile' | 'tablet' | 'pc' | 'unknown'
	>('unknown')

	const [currentDevice, setCurrentDevice] =
		useState<string>('unknown')
	const [reasonText, setReasonText] = useState('')

	const MODAL_DESCRIPTION_TEXT = {
		init: '',
		verifying: '계속하기를 누르면 기기를 검증합니다',
		validateSuccess:
			'기기가 확인되어 해당 기관 페이지로 이동합니다',
		validateFail: `해당 기기로 기기 정보를 업데이트할까요? 기기정보: ${currentDevice}`,
		requestUpdate:
			'기관의 사유 확인 및 승인 이후 해당 기기로 접속 가능합니다',
		requestQueued:
			'기관의 사유 검토 및 승인을 기다리는 중이에요. 승인 이후 해당 기기로 접속 가능합니다.'
	}

	const isDeviceValidate = () => {
		if (
			currentDevice === 'unknown' ||
			currentDeviceType === 'unknown'
		) {
			toast({
				title: '현재 접속 기기를 확인할 수 없습니다',
				description:
					'다시 시도하거나 계속하여 실패할 경우 관라자에게 문의해주세요',
				variant: 'negative'
			})
			return 'error'
		}

		const isDeviceUnregistered =
			!registeredDevice[currentDeviceType]

		console.log(
			'registeredDevice ',
			registeredDevice[currentDeviceType]
		)

		console.log('currentDevice ', currentDevice)
		console.log('currentDeviceType ', currentDeviceType)

		const isCurrentDeviceValid =
			isDeviceUnregistered ||
			registeredDevice[currentDeviceType] === currentDevice

		isDeviceUnregistered && handleDeviceRegister()

		console.log('isCurrentDeviceValid', isCurrentDeviceValid)
		return isCurrentDeviceValid
	}

	const verifyDevice = () => {
		if (deviceChangeReason) {
			setCurrState('requestQueued')
			return
		}

		const isValidDevice = isDeviceValidate()
		if (isValidDevice === 'error') return

		if (isValidDevice) {
			setCurrState('validateSuccess')
		} else {
			setCurrState('validateFail')
		}
	}

	const registerDeviceInfo = useAction(deviceUpdateAction, {
		onSuccess: () => {
			toast({
				title: '기기 최초 등록 완료',
				description: '이제부터 해당 기기로 접속할 수 있어요',
				variant: 'positive'
			})
		},
		onError: () => {
			toast({
				title: '기기 최초 등록 실패',
				description:
					'다시 시도하거나 계속하여 실패할 경우 관라자에게 문의해주세요',
				variant: 'negative'
			})
		}
	})

	const handleDeviceRegister = () => {
		registerDeviceInfo.execute({
			device1:
				currentDeviceType === 'mobile'
					? currentDevice
					: registeredDevice.mobile,
			device2:
				currentDeviceType === 'tablet'
					? currentDevice
					: registeredDevice.tablet,
			device3:
				currentDeviceType === 'pc'
					? currentDevice
					: registeredDevice.pc
		})
	}

	const deviceChangeReasonUpdate = useAction(
		deviceChangeReasonUpdateAction,
		{
			onSuccess: () => {
				toast({
					title: '기기 변경 사유 제출 성공',
					description:
						'기관에서 사유 확인 후 승인하면 해당 기기로 접속할 수 있어요',
					variant: 'positive'
				})
				setCurrState('requestQueued')
			},
			onError: () => {
				toast({
					title: '기기 변경 사유 제출 실패',
					description:
						'다시 시도하거나 계속하여 실패할 경우 관라자에게 문의해주세요',
					variant: 'negative'
				})
			}
		}
	)

	const submitDeviceChangeReason = () => {
		if (reasonText.length < 10 || reasonText.length > 100) {
			toast({
				title: '사유 입력 오류',
				description:
					'사유는 10자 이상, 100자 이내로 입력해주세요',
				variant: 'negative'
			})
			return
		}

		const finedReasonObj = {
			deviceToChange: currentDevice,
			deviceType: currentDeviceType,
			reason: reasonText
		}

		// 기기 변경 사유 제출
		console.log(reasonText)
		console.log(finedReasonObj)
		deviceChangeReasonUpdate.execute({
			device_change_reason: JSON.stringify(finedReasonObj)
		})
	}

	// currState에 따른 모달 계속하기 버튼 클릭 handle
	const handleClick = () => {
		switch (currState) {
			case 'verifying':
				verifyDevice()
				break
			case 'validateSuccess':
				router.push(`/academy/${academyId}`)
				break
			case 'validateFail':
				setCurrState('requestUpdate')
				break
			case 'requestUpdate':
				submitDeviceChangeReason()
				break
			case 'requestQueued':
				// 모달 닫기
				toggleDialog('isDeviceControlModalOpened')
				break
			default:
				break
		}
	}

	useEffect(() => {
		const device = getDeviceInfo()
		setCurrentDevice(device)

		const deviceType = getDeviceType()
		setCurrentDeviceType(deviceType)

		setCurrState('verifying')
	}, [])

	return selectedAcademyId === academyId ? (
		<Dialog
			open={isDeviceControlModalOpened}
			onOpenChange={() => {
				toggleDialog('isDeviceControlModalOpened')
			}}
		>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="aria-modal pc:px-6 flex flex-col items-center justify-center gap-6 px-5 py-10">
					<Icon
						name="ErrorWarningFill"
						size="80"
						className="text-primary"
					/>
					<div className="flex flex-col items-center justify-center gap-1 text-center">
						<div className="text-xl font-semibold">
							{MODAL_TITLE_TEXT[currState]}
						</div>
						<div className="text-secondary-foreground text-lg font-medium">
							{MODAL_DESCRIPTION_TEXT[currState]}
						</div>
					</div>
					{currState === 'requestUpdate' ? (
						<Textarea
							placeholder="기기 변경 사유를 입력해주세요. (10자 이상, 100자 이내 입력)"
							onChange={(e) => setReasonText(e.target.value)}
						/>
					) : null}
					<div className="flex gap-2">
						<DialogClose>
							<Button variant="secondary">닫기</Button>
						</DialogClose>
						<Button onClick={handleClick}>
							{MODAL_BUTTON_TEXT[currState]}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	) : (
		<div />
	)
}
