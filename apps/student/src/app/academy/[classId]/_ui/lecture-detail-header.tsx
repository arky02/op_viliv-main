'use client'

import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'
import { useRouter } from 'next/navigation'
import { useImgTypeState } from '@core/react/zustand/imgtype-store'
import { useState } from 'react'
import { type GetLectureInfo } from '@/module/lecture/model'
import { downloadPDF } from '@/hook/download-pdf'
import { LectureInfo } from './lecture-info'
import { LectureImgTypeSelect } from './lecture-img-type-select'

interface LectureDetailHeaderProps {
	params: {
		lectureId: string
	}
	lecture: GetLectureInfo
}

export function LectureDetailHeader({
	params,
	lecture
}: LectureDetailHeaderProps) {
	const imgType = useImgTypeState()

	const router = useRouter()
	const goBack = () => {
		router.back()
	}

	const [isPDFWithScript, setIsPDFWithScript] =
		useState(true)

	const handleDownloadPDF = async () => {
		const url = `${window.location.origin}/pdf/${params.lectureId}?type=${imgType}${!isPDFWithScript ? '&script=false' : ''}`
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
				<div
					className="-mb-[8px] -mt-[13px] flex items-center justify-end gap-[7px] text-[14px] font-semibold"
					onClick={() => setIsPDFWithScript((prev) => !prev)}
				>
					<Button
						type="button"
						size="sm"
						options="icon"
						className="h-[20px] w-[20px] pt-[2px] align-middle"
						disabled={!isPDFWithScript}
					>
						<Icon name="CheckLine" size={15} />
					</Button>
					PDF에 강의 스크립트 추가하기
				</div>
			</div>
		</div>
	)
}
