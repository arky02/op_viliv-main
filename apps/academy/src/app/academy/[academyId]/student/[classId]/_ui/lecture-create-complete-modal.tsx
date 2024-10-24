'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useDialogStore } from '@core/react/zustand/dialog-store'
import { useRouter } from 'next/navigation'

interface LectureCreateCompleteModalProps {
	params: {
		academyId: string
		classId: string
	}
}

export function LectureCreateCompleteModal({
	params
}: LectureCreateCompleteModalProps): JSX.Element {
	const {
		isLectureCreateCompleteModalOpened,
		toggleDialog
	} = useDialogStore()

	const router = useRouter()
	const handleCloseToggle = () => {
		router.push(
			`/academy/${params.academyId}/student/${params.classId}/lecture`
		)
	}

	return (
		<Dialog
			open={isLectureCreateCompleteModalOpened}
			onOpenChange={() => {
				toggleDialog('isLectureCreateCompleteModalOpened')
			}}
		>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="flex flex-col items-center gap-8">
					<Icon
						name="Loader4Fill"
						className="text-primary size-20 animate-spin"
					/>
					<div className="flex flex-col items-center justify-center gap-1">
						<div className="text-xl font-semibold">
							영상을 분석하고 있어요
						</div>
						<div className="text-secondary-foreground text-base font-medium">
							<div>
								분석 완료까지 약 15분 정도 소요될 예정이며,
							</div>
							<div>현재 페이지를 벗어나더라도 계속 진행돼요.</div>
						</div>
					</div>
					<DialogClose className="w-full">
						<Button
							size="lg"
							className="w-full"
							onClick={handleCloseToggle}
						>
							확인했어요
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	)
}
