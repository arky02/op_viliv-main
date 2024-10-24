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
import { type GetLectureInfo } from '@/module/lecture/model'
import { downloadPDF } from '@/hook/download-pdf'
import { LectureInfo } from './lecture-info'

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
	const router = useRouter()
	const goBack = () => {
		router.back()
	}

	const handleDownloadPDF = async () => {
		const url = `${window.location.origin}/pdf/${params.lectureId}`
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
				<div className="flex justify-between">
					<div className="max-pc:hidden">
						<LectureInfo lecture={lecture} />
					</div>
					<div className="flex items-center gap-4">
						<Button
							variant="secondary"
							className="max-pc:hidden"
							onClick={handleDownloadPDF}
						>
							PDF 확인하기
						</Button>
						<div className="max-pc:hidden">
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
		</div>
	)
}
