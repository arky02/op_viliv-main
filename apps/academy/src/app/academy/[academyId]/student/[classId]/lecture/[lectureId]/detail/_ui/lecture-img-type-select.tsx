'use client'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@design-system/ui'
import { useRouter } from 'next/navigation'

interface LectureImgTypeSelectProps {
	size?: 'sm' | 'md'
}

export function LectureImgTypeSelect({
	size = 'md'
}: LectureImgTypeSelectProps) {
	const router = useRouter()

	const handleImgTypeSelect = (selectedType: string) => {
		// get current url
		const currentUrl = window.location.href.split('?')[0]

		router.push(`${currentUrl}?type=${selectedType}`)
	}

	return (
		<Select onValueChange={handleImgTypeSelect}>
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
