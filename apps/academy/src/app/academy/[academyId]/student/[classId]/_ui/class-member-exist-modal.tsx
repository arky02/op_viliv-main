'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useDialogStore } from '@core/react/zustand/dialog-store'

//TODO : 기능 추가 필요

export function ClassMemberExistModal(): JSX.Element {
	const { isClassMemberExistModalOpened, toggleDialog } =
		useDialogStore()

	return (
		<Dialog
			open={isClassMemberExistModalOpened}
			onOpenChange={() => {
				toggleDialog('isClassMemberExistModalOpened')
			}}
		>
			<DialogContent hideClose className="w-[calc(100%-2rem)]">
				<div className="pc:px-6 flex flex-col items-center justify-center gap-6 px-5 py-10">
					<Icon
						name="ErrorWarningFill"
						size="80"
						className="text-primary"
					/>
					<div className="flex flex-col items-center justify-center gap-1 text-center">
						<div className="text-xl font-semibold">
							해당 내용은 수정이 불가능해요
						</div>
						<div className="text-secondary-foreground text-lg font-medium">
							해당 강사는 이미 강의를 업로드한 상태이기 때문에 다른
							강사로 변경하거나 삭제할 수 없어요.
						</div>
					</div>
					<DialogClose>
						<Button>확인했어요</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	)
}
