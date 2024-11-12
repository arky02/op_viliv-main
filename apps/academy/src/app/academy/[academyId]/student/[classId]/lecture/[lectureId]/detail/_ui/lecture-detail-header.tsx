'use client'

import { Icon } from '@design-system/icon'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@design-system/ui'
import { useRouter } from 'next/navigation'
import { useImgTypeState } from '@core/react/zustand/imgtype-store'
import { type GetLectureInfo } from '@/module/lecture/model'
import { downloadPDF } from '@/hook/download-pdf'
import { LectureInfo } from './lecture-info'
import { LectureImgTypeSelect } from './lecture-img-type-select'

interface LectureDetailHeaderProps {
	params: {
		academyId: string
		classId: string
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

	const handleDownloadPDF = async () => {
		const url = `${window.location.origin}/pdf/${params.lectureId}?type=${imgType}}`
		await downloadPDF(url)
	}

	const handleEditClick = () => {
		router.push(
			`/academy/${params.academyId}/student/${params.classId}/lecture/${params.lectureId}/edit`
		)
	}

	return (
		<div>
			<div className="pc:hidden bg-background flex w-full justify-between gap-4 p-4">
				<Icon onClick={goBack} name="ArrowLeftLine" />
				<div className="text-base font-semibold">강의 상세</div>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger className="mb-auto ml-auto">
							<Icon
								name="More2Fill"
								size={28}
								className="text-secondary-foreground"
								onClick={(e) => e.stopPropagation()}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-[172px]">
							<DropdownMenuItem
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
									handleEditClick()
								}}
							>
								수정하기
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
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
				<div className="flex justify-between">
					<LectureInfo lecture={lecture} />
					<div className="flex items-center gap-4">
						<LectureImgTypeSelect />
						<Button
							variant="secondary"
							className=""
							onClick={handleDownloadPDF}
						>
							PDF 확인하기
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger className="mb-auto ml-auto">
								<Icon
									name="More2Fill"
									size={28}
									className="text-secondary-foreground"
									onClick={(e) => e.stopPropagation()}
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[172px]">
								<DropdownMenuItem
									onClick={(e) => {
										e.preventDefault()
										e.stopPropagation()
										handleEditClick()
									}}
								>
									수정하기
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</div>
	)
}
