'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useRouter } from 'next/navigation'

interface PlanQuitModalProps {
	params: {
		academyId: string
	}
}

export function PlanQuitModal({
	params
}: PlanQuitModalProps): JSX.Element {
	const router = useRouter()
	const handleCloseToggle = () => {
		router.push(`/academy/${params.academyId}/plan`)
	}

	const handleQuitPlanButtonClick = () => {
		router.push('http://pf.kakao.com/_pIQxoG')
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">구독 해지</Button>
			</DialogTrigger>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="flex flex-col items-center gap-8">
					<Icon
						name="EmotionSadFill"
						className="text-primary size-20"
					/>
					<div className="flex flex-col gap-1 text-center">
						<div className="text-xl font-semibold">
							정말 구독을 해지하시겠어요?
						</div>
						<div className="text-secondary-foreground text-center text-base font-medium">
							<div>현재 사용중인 플랜의 구독 해지를 원하시면</div>
							<div>알림톡으로 연결해 드릴게요</div>
						</div>
					</div>
					<div className="flex w-full items-center justify-center gap-2">
						<DialogClose className="w-1/2">
							<Button
								size="lg"
								className="w-full"
								onClick={handleCloseToggle}
							>
								유지할게요
							</Button>
						</DialogClose>
						<Button
							onClick={handleQuitPlanButtonClick}
							size="lg"
							className="w-1/2"
							variant="outline"
						>
							해지할게요
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
