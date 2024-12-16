'use client'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@design-system/ui'
import {
	useImgTypeState,
	useImgTypeStateAction
} from '@core/react/zustand/imgtype-store'

////////////////////////

interface LectureImgTypeSelectProps {
	size?: 'sm' | 'md'
}

type LectureImgType =
	| 'default'
	| 'person_removed'
	| 'white_ver_dir'

export function LectureImgTypeSelect({
	size = 'md'
}: LectureImgTypeSelectProps) {
	const imgType = useImgTypeState()
	const setImgType = useImgTypeStateAction()

	const handleImgTypeSelect = (
		selectedType: LectureImgType
	) => {
		setImgType(selectedType)
	}

	return (
		<Select
			onValueChange={handleImgTypeSelect}
			value={imgType ?? undefined}
		>
			<SelectTrigger
				className="h-fit w-fit"
				style={{ fontSize: `${size === 'sm' ? '14' : '16'}px` }}
			>
				<SelectValue
					placeholder={
						size === 'sm'
							? '이미지 타입'
							: '강의 이미지 타입 설정'
					}
				/>
			</SelectTrigger>
			<SelectContent
				style={{ fontSize: `${size === 'sm' ? '14' : '16'}px` }}
			>
				<SelectItem value="default">원본 이미지</SelectItem>
				<SelectItem value="person_removed">
					{`칠판 ${size === 'sm' ? '스캔본' : '스캔 이미지'}`}
				</SelectItem>
				<SelectItem value="white_ver_dir">
					{`인쇄용${size === 'sm' ? '' : ' 이미지'}`}
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
