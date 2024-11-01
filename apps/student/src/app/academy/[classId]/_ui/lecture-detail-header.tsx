'use client'

import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'
import { useRouter } from 'next/navigation'
import { type GetLectureInfo } from '@/module/lecture/model'
import { downloadPDF } from '@/hook/download-pdf'
import { LectureInfo } from './lecture-info'
import { LectureImgTypeSelect } from './lecture-img-type-select'

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
			<div className="max-pc:hidden bg-background pc:px-[120px] pc:py-8 pc:border-b flex flex-col gap-6 p-4">
				<div className="flex items-center gap-[5px]">
					<Icon
						name="ArrowLeftLine"
						onClick={goBack}
						size={20}
						className="hover:cursor-pointer"
					/>
					<div className="text-base font-semibold">돌아가기</div>
				</div>
				<div className="flex justify-between gap-4">
					<LectureInfo lecture={lecture} />
					<div className="flex gap-4 whitespace-nowrap">
						<LectureImgTypeSelect />
						<Button
							variant="secondary"
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
