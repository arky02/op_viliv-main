'use client'

import { Icon } from '@design-system/icon'
import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@design-system/ui'
import { useRouter } from 'next/navigation'
import { type GetLectureInfo } from '@/module/lecture/model'
import { downloadPDF } from '@/hook/download-pdf'
import { LectureInfo } from './lecture-info'

interface LectureDetailHeaderProps {
	params: {
		lectureId: string
	}
	lecture: GetLectureInfo
	type: 'default' | 'person_removed' | 'white_ver_dir'
}

export function LectureDetailHeader({
	params,
	lecture,
	type
}: LectureDetailHeaderProps) {
	const router = useRouter()
	const goBack = () => {
		router.back()
	}

	const handleDownloadPDF = async () => {
		const url = `${window.location.origin}/pdf/${params.lectureId}?type=${type}`
		await downloadPDF(url)
	}

	return (
		<div>
			<div className="pc:hidden bg-background flex w-full justify-between gap-4 p-4">
				<Icon onClick={goBack} name="ArrowLeftLine" />
				<div className="text-base font-semibold">강의 상세</div>
				<div className="w-4" />
			</div>
			<div className="bg-background pc:px-[120px] pc:py-8 pc:border-b flex flex-col gap-6 p-4">
				<div className="max-pc:hidden flex items-center gap-[5px]">
					<Icon
						name="ArrowLeftLine"
						onClick={goBack}
						size={20}
						className="hover:cursor-pointer"
					/>
					<div className="text-base font-semibold">돌아가기</div>
				</div>
				<div className="flex justify-between gap-4">
					<div className="max-pc:hidden">
						<LectureInfo lecture={lecture} />
					</div>
					<div className="flex gap-4 whitespace-nowrap">
						<Select
							onValueChange={(selectedType) => {
								const currentUrl =
									window.location.href.split('?')[0]

								router.push(`${currentUrl}?type=${selectedType}`)
							}}
						>
							<SelectTrigger className="w-fit">
								<SelectValue placeholder="강의 이미지 종류 선택" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="default">원본 이미지</SelectItem>
								<SelectItem value="person_removed">
									칠판 스캔 이미지
								</SelectItem>
								<SelectItem value="white_ver_dir">
									인쇄용 이미지
								</SelectItem>
							</SelectContent>
						</Select>

						<Button
							variant="secondary"
							className="max-pc:hidden"
							onClick={handleDownloadPDF}
						>
							PDF 확인하기
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
