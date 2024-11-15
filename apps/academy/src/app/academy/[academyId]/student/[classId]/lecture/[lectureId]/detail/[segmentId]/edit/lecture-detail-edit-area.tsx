/* eslint-disable react/no-array-index-key */
'use client'

import { Icon } from '@design-system/icon'
import {
	Button,
	Input,
	Textarea,
	toast
} from '@design-system/ui'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAction } from '@core/react'
import { useRouter } from 'next/navigation'
import { useImgTypeState } from '@core/react/zustand/imgtype-store'
import { type GetSegmentInclude } from '@/module/segment/model'
import { convertToTimeFormatNumber } from '@/lib/util/convert-to-time-format-number'
import { updateSegmentAction } from '@/module/segment/action'

interface LectureDetailEditAreaProps {
	segment: GetSegmentInclude
}

const THUMBNAIL_IMG_BASE_URL = 'viliv.ngrok.dev/api/frames/'

export function LectureDetailEditArea({
	segment
}: LectureDetailEditAreaProps) {
	const imgType = useImgTypeState()

	const [segmentTitle, setSegmentTitle] = useState(
		segment.title
	)
	const [summary, setSummary] = useState(
		segment.summarization
	)
	const [scripts, setScripts] = useState(
		segment.textWithTimestamps
	)
	const [selectedFrames, setSelectedFrames] = useState<
		number[]
	>([])
	const [lectureId, setLectureId] = useState(
		segment.frames[0]?.frame
			.replace(THUMBNAIL_IMG_BASE_URL, '')
			.split('/')[0]
	)

	const router = useRouter()
	const goBack = () => {
		router.back()
	}

	useEffect(() => {
		const initialSelectedFrames = segment.frames
			.map((frame, index) => (frame.isThumbnail ? index : -1))
			.filter((index) => index !== -1)
		setSelectedFrames(initialSelectedFrames)
	}, [segment.frames])

	const handleTitleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setSegmentTitle(e.target.value)
	}

	const handleSummaryChange = (
		index: number,
		newText: string
	) => {
		const updatedSummary = summary.map((item, idx) =>
			idx === index ? newText : item
		)
		setSummary(updatedSummary)
	}

	const handleScriptTextChange = (
		index: number,
		newText: string
	) => {
		const updatedScripts = scripts.map((item, idx) =>
			idx === index ? { ...item, text: newText } : item
		)
		setScripts(updatedScripts)
	}

	const updateSegment = useAction(updateSegmentAction, {
		onSuccess: () => {
			toast({
				title: '강의 상세 변경이 완료되었습니다',
				variant: 'positive'
			})
		},
		onError: (error) => {
			toast({
				title: '강의 상세 변경에 실패했습니다',
				variant: 'negative'
			})
			console.error(error)
		}
	})

	const handleSubmit = () => {
		const updatedFrames = segment.frames.map(
			(frame, index) => ({
				...frame,
				isThumbnail: selectedFrames.includes(index)
			})
		)

		// TODO: update segment
		updateSegment.execute({
			segmentId: segment.id,
			title: segmentTitle,
			summarization: summary,
			textWithTimestamps: scripts,
			frames: updatedFrames,
			framesId: selectedFrames.join(',')
		})
	}

	const handleFrameSelect = (index: number) => {
		setSelectedFrames((prevSelected) =>
			prevSelected.includes(index)
				? prevSelected.filter((i) => i !== index)
				: [...prevSelected, index]
		)
	}

	const extractTimeFromFilename = (filename: string) => {
		const match = /\/(?<number>\d+)\.jpg$/.exec(filename)
		const number = match?.groups?.number
			? parseInt(match.groups.number, 10)
			: 0

		const hours = Math.floor(number / 3600)
			.toString()
			.padStart(2, '0')
		const minutes = Math.floor((number % 3600) / 60)
			.toString()
			.padStart(2, '0')
		const seconds = (number % 60).toString().padStart(2, '0')

		return `${hours}:${minutes}:${seconds}`
	}

	return (
		<div>
			<div>
				<div className="pc:hidden bg-background flex w-full justify-between gap-4 p-4">
					<Icon onClick={goBack} name="ArrowLeftLine" />
					<div className="text-base font-semibold">
						하위 문단 내용 수정하기
					</div>
					<div className="h-6 w-6" />
				</div>
			</div>
			<div className="bg-background pc:px-[120px] pc:py-20 flex flex-col gap-10 p-4">
				<div className="max-pc:hidden bg-background sticky top-0 z-20 flex h-fit items-center justify-between border-b py-4">
					<div className="flex gap-3">
						<Icon
							name="ArrowLeftLine"
							size={28}
							onClick={goBack}
							className="hover:cursor-pointer"
						/>
						<div className="text-xl font-semibold">
							하위 문단 내용 수정하기
						</div>
					</div>
					<Button onClick={handleSubmit}>완료</Button>
				</div>
				<div className="flex flex-col gap-2">
					<div className="text-base font-semibold">
						하위 문단 제목
					</div>
					<Input
						value={segmentTitle}
						onChange={handleTitleChange}
					/>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<div className="text-base font-semibold">이미지</div>
						<div className="text-secondary-foreground text-sm font-medium">
							5초 간격으로 캡처된 스크린샷이며, 원하는 사진을
							선택하거나 선택 해제할 수 있어요.
						</div>
					</div>
					<div className="pc:grid-cols-5 pc:gap-2 grid grid-cols-1 gap-3">
						{segment.frames
							.sort(
								(a, b) => Number(a.frameId) - Number(b.frameId)
							)
							.map((frame, index) => {
								const frameImgUrl = !imgType
									? frame.frame
									: `${THUMBNAIL_IMG_BASE_URL}${lectureId}${imgType === 'default' ? '' : `/${imgType}`}/${frame.frameId}.jpg`
								return (
									<div
										onClick={() => handleFrameSelect(index)}
										key={index}
										className="relative"
									>
										<Image
											src={`https://${frameImgUrl}`}
											alt="frame"
											width={240}
											height={150}
											className={`aspect-video w-full cursor-pointer rounded-lg ${
												selectedFrames.includes(index)
													? 'border-primary border-[3px]'
													: 'border-0'
											}`}
										/>
										<div
											className={`text-background absolute bottom-2 left-2 mx-1 my-1 px-1 text-sm font-medium ${imgType === 'white_ver_dir' ? 'bg-white text-black' : 'text-white'} `}
										>
											{extractTimeFromFilename(frame.frame)}
										</div>
										<div className="absolute right-2 top-2">
											<Button
												type="button"
												size="sm"
												options="icon"
												disabled={!selectedFrames.includes(index)}
											>
												<Icon name="CheckLine" />
											</Button>
										</div>
									</div>
								)
							})}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="text-base font-semibold">
						요약 내용
					</div>
					{summary.map((text, index) => (
						<Textarea
							key={index}
							value={text}
							onChange={(e) =>
								handleSummaryChange(index, e.target.value)
							}
						/>
					))}
				</div>
				<div className="flex flex-col gap-2">
					<div className="text-base font-semibold">스크립트</div>
					{scripts.map((script, index) => (
						<div className="flex gap-2" key={index}>
							<div className="text-primary text-sm font-semibold">
								{convertToTimeFormatNumber(script.timeStamp)}
							</div>
							<Textarea
								value={script.text}
								onChange={(e) =>
									handleScriptTextChange(index, e.target.value)
								}
							/>
						</div>
					))}
				</div>
			</div>
			<div className="pc:hidden bg-background fixed bottom-0 left-0 right-0 p-4">
				<Button className="w-full" onClick={handleSubmit}>
					완료
				</Button>
			</div>
		</div>
	)
}
