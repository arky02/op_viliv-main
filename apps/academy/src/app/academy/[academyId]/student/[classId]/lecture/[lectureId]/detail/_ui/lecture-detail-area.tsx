'use client'

/* eslint-disable react/no-array-index-key */
import { useRef } from 'react'
import { Badge, Button } from '@design-system/ui'
import Image from 'next/image'
import { Icon } from '@design-system/icon'
import Link from 'next/link'
import defaultImage from '@/lib/asset/image/horizontal-default-image.png'
import { type GetLectureInfo } from '@/module/lecture/model'
import { downloadPDF } from '@/hook/download-pdf'
import { convertToTimeFormatNumber } from '@/lib/util/convert-to-time-format-number'
import { TimestampAccordion } from './timestamp-accordion'
import { SummaryEditModal } from './summary-edit-modal'
import { LectureStatusSwitch } from './lecture-status-switch'
import { LectureInfo } from './lecture-info'

interface Frame {
	frame: string
	isThumbnail: boolean
}

interface LectureDetailAreaProps {
	params: {
		academyId: string
		classId: string
		lectureId: string
	}
	lecture: GetLectureInfo
}

export function LectureDetailArea({
	params,
	lecture
}: LectureDetailAreaProps) {
	const { analyzedLecture } = lecture
	const { segments = [] } = analyzedLecture || {}

	// const sortedSegments = [...segments].sort((a, b) => {
	// 	const timeA = parseInt(a.timeStamp, 10)
	// 	const timeB = parseInt(b.timeStamp, 10)
	// 	return timeA - timeB
	// })

	const calculateSegmentDuration = (
		textWithTimestamps: { timeStamp: number }[]
	) => {
		if (textWithTimestamps.length === 0) return 0
		const firstTimestamp = textWithTimestamps[0]?.timeStamp
		const lastTimestamp =
			textWithTimestamps[textWithTimestamps.length - 1]
				?.timeStamp
		if (
			firstTimestamp === undefined ||
			lastTimestamp === undefined
		)
			return 0
		return (lastTimestamp - firstTimestamp) / 1000
	}

	const mobileVideoRef = useRef<HTMLVideoElement>(null)
	const pcVideoRef = useRef<HTMLVideoElement>(null)

	const handleTimeJump = async (time: number) => {
		if (mobileVideoRef.current && window.innerWidth < 1280) {
			mobileVideoRef.current.currentTime = time
			await mobileVideoRef.current.play()
		} else if (pcVideoRef.current) {
			pcVideoRef.current.currentTime = time
			await pcVideoRef.current.play()
		}
	}

	const handleDownloadPDF = async () => {
		const url = `${window.location.origin}/pdf/${lecture.id}`

		await downloadPDF(url)
	}

	return (
		<div className="flex flex-col">
			{/* 모바일 비디오 */}
			<video
				ref={mobileVideoRef}
				src={lecture.videoUrl}
				controls
				controlsList="nodownload"
				onContextMenu={(e) => e.preventDefault()}
				playsInline
				className="pc:hidden sticky top-0 z-10 w-full"
			>
				<track kind="captions" label="Korean" />
			</video>
			<div className="pc:hidden p-4">
				<LectureInfo lecture={lecture} />
			</div>

			<div className="pc:hidden bg-background fixed bottom-0 left-0 z-20 w-full px-4 py-2">
				<Button
					className="w-full"
					variant="secondary"
					onClick={handleDownloadPDF}
				>
					PDF 확인하기
				</Button>
			</div>

			<div className="max-pc:flex-col pc:mx-[120px] pc:mt-10 mx-4 flex gap-5">
				<div className="bg-background pc:w-1/2 pc:sticky pc:top-10 flex h-fit flex-col gap-4 rounded-md border p-4 shadow">
					{/* PC 비디오 */}
					<video
						ref={pcVideoRef}
						src={lecture.videoUrl}
						controls
						controlsList="nodownload"
						onContextMenu={(e) => e.preventDefault()}
						playsInline
						className="max-pc:hidden w-full rounded-md"
					>
						<track kind="captions" label="Korean" />
					</video>
					<div className="flex flex-col gap-4 rounded-md border p-6">
						<div className="flex items-center justify-between">
							<div className="text-lg font-semibold">
								강의 전체 요약
							</div>
							<SummaryEditModal lecture={lecture} />
						</div>
						<div className="text-sm">{lecture.description}</div>
					</div>
					<div className="bg-secondary flex items-center justify-between rounded-md p-6">
						<div className="text-base font-semibold">
							강의 공개 여부
						</div>
						<LectureStatusSwitch lecture={lecture} />
					</div>
				</div>
				<div className="bg-background pc:w-1/2 flex flex-col gap-4 rounded-md p-4 shadow">
					{segments.map((segment, index) => {
						const segmentDuration = calculateSegmentDuration(
							segment.textWithTimestamps
						)

						let framesToDisplay: Frame[] = []
						const thumbnailFrames = segment.frames.filter(
							(frame: Frame) => frame.isThumbnail
						)

						if (thumbnailFrames.length > 0) {
							framesToDisplay = thumbnailFrames
						} else if (segment.frames.length > 0) {
							framesToDisplay = [
								segment.frames[0] || {
									id: '',
									frame: '',
									isThumbnail: false,
									segmentId: ''
								}
							]
						}

						return (
							<div
								key={index}
								className="flex flex-col gap-6 rounded-md border p-6"
							>
								<div className="flex flex-col gap-3">
									<div className="flex items-center justify-between">
										<div className="text-lg font-semibold">
											{segment.title}
										</div>
										<Link
											href={`/academy/${params.academyId}/student/${params.classId}/lecture/${params.lectureId}/detail/${segment.id}/edit`}
										>
											<Button
												size="sm"
												variant="secondary"
												className="max-pc:hidden"
											>
												수정하기
											</Button>
											<Button
												size="sm"
												variant="secondary"
												className="pc:hidden w-fit flex-1 whitespace-nowrap"
											>
												수정
											</Button>
										</Link>
									</div>
									<div className="flex gap-2">
										<Badge
											className="text-primary rounded-sm bg-[#3C83F61A]"
											size="sm"
										>
											<Icon name="PlayMiniFill" size={16} />{' '}
											{convertToTimeFormatNumber(segment.timeStamp)}
										</Badge>
										<Badge
											variant="secondary"
											className="rounded-sm"
											size="sm"
										>
											총 {segmentDuration}초
										</Badge>
									</div>
								</div>

								{framesToDisplay.length > 0 ? (
									framesToDisplay.map((frame, idx) => (
										<Image
											key={idx}
											src={`https://${frame.frame}`}
											alt={segment.title}
											width={640}
											height={360}
										/>
									))
								) : (
									<Image
										src={defaultImage}
										alt="default thumbnail"
										width={640}
										height={360}
									/>
								)}

								<div className="text-sm">
									{segment.summarization.length > 0 ? (
										<ul className="list-inside list-disc">
											{segment.summarization.map((item) => (
												<li key={item}>{item}</li>
											))}
										</ul>
									) : (
										'요약이 없습니다.'
									)}
								</div>

								<div className="bg-secondary flex items-center justify-between rounded-md p-6">
									<TimestampAccordion
										textWithTimestamp={segment.textWithTimestamps}
										onTimeJump={handleTimeJump}
									/>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
