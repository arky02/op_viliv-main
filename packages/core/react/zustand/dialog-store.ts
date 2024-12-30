import { create } from 'zustand'

// 전역 다이얼로그 오픈 상태 관리
interface DialogProps {
	isLectureCreateCompleteModalOpened: boolean // 강의 생성 완료 모달
	isClassMemberExistModalOpened: boolean // 강의 존재하는 강사 수정 불가 모달
	isLectureDeleteModalOpened: boolean // 강의 삭제 모달
	isClassDeleteModalOpened: boolean // 그룹 삭제 모달
	isDeviceControlModalOpened: false // 디바이스 제어 모달
}

interface DialogStore extends DialogProps {
	toggleDialog: (dialogName: keyof DialogProps) => void
}

const initialDialogState: DialogProps = {
	isLectureCreateCompleteModalOpened: false,
	isClassMemberExistModalOpened: false,
	isLectureDeleteModalOpened: false,
	isClassDeleteModalOpened: false,
	isDeviceControlModalOpened: false
}

const useDialogStore = create<DialogStore>((set) => ({
	...initialDialogState,
	toggleDialog(dialogName) {
		set((state) => ({
			...state,
			[dialogName]: !state[dialogName]
		}))
	}
}))

export { useDialogStore }
