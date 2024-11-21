'use client'

import { Logo } from '@design-system/template'
import { Icon } from '@design-system/icon'
import Image from 'next/image'
import { type GetLectureInfo } from '@/module/lecture/model'
import { formatDate } from '@/lib/util/format-date'
import { A4Layer } from './a4-layer'

const THUMBNAIL_IMG_BASE_URL = 'viliv.ngrok.dev/api/frames/'

interface PDFAreaProps {
	lecture: GetLectureInfo
	type:
		| 'default'
		| 'person_removed'
		| 'white_ver_dir'
		| undefined
}

function formatTimestamp(ms: number): string {
	const totalSeconds = Math.floor(ms / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function PDFArea({ lecture, type }: PDFAreaProps) {
	const { analyzedLecture } = lecture
	const { segments = [], questions = [] } =
		analyzedLecture || {}

	return (
		<div className="bg-background flex flex-col">
			<A4Layer>
				<div className="flex h-[1400px] flex-col justify-between">
					<div className="flex h-full flex-col items-center gap-10">
						<div className="bg-muted flex w-full flex-col items-center gap-6 rounded-xl p-10 text-center">
							<div className="text-4xl font-bold">
								{lecture.name}
							</div>
							<div>
								<div className="text-secondary-foreground max-pc:items-start pc:items-center pc:gap-4 flex gap-2 text-xl font-medium">
									<div className="flex items-center gap-[5px]">
										<Icon
											name="PresentationFill"
											size={18}
											className="text-muted-foreground"
										/>
										<div>
											{lecture.academyMembers.length > 0 ? (
												<>
													{lecture.academyMembers[0]?.user?.name}
													{lecture._count.academyMembers > 1 && (
														<> 외 {lecture._count.academyMembers - 1}명</>
													)}
												</>
											) : (
												'지정된 강사가 없습니다'
											)}
										</div>
									</div>
									<div className="flex items-center gap-[5px]">
										<Icon
											name="CalendarTodoFill"
											size={18}
											className="text-muted-foreground"
										/>
										<div>{formatDate(new Date(lecture.date))}</div>
									</div>
								</div>
							</div>
						</div>
						<div className="text-secondary-foreground text-center text-lg font-medium">
							{lecture.description}
						</div>
					</div>
					<Logo />
				</div>
			</A4Layer>

			{/* 세그먼트 */}
			{segments.map((segment) => {
				const sortedTextWithTimestamps = [
					...segment.textWithTimestamps
				].sort((a, b) => a.timeStamp - b.timeStamp)
				const firstTimestamp =
					sortedTextWithTimestamps[0]?.timeStamp
				const lastTimestamp =
					sortedTextWithTimestamps[
						sortedTextWithTimestamps.length - 1
					]?.timeStamp

				const thumbnailFrames = segment.frames.filter(
					(frame) => frame.isThumbnail
				)

				const finedThumbnailFrames =
					thumbnailFrames.length > 0
						? thumbnailFrames
						: [segment.frames[0]]

				const framesToDisplay = !type
					? finedThumbnailFrames
					: finedThumbnailFrames.map((frame) => {
							if (!frame) return frame

							const lectureId = frame.frame
								.replace('//', '/')
								.replace(THUMBNAIL_IMG_BASE_URL, '')
								.split('/')[0]

							const thumbnailUrlToDisplay = `${THUMBNAIL_IMG_BASE_URL}${lectureId}${type === 'default' ? '' : `/${type}`}/${frame.frameId}.jpg`

							return {
								...frame,
								frame: thumbnailUrlToDisplay
							}
						})
				console.log("pdf lecture img framesToDisplay: ",framesToDisplay)

				return (
					<A4Layer key={segment.id}>
						<div className="flex flex-col justify-between">
							<div className="flex flex-col gap-10">
								<div className="flex flex-col gap-2">
									<div className="bg-secondary flex items-center justify-between border px-6 py-4 text-lg font-semibold">
										<div>{segment.title}</div>
										<div className="text-secondary-foreground text-sm font-medium">
											{firstTimestamp
												? formatTimestamp(firstTimestamp)
												: '00:00:00'}{' '}
											-{' '}
											{lastTimestamp
												? formatTimestamp(lastTimestamp)
												: '00:00:00'}
										</div>
									</div>
									<div className="grid grid-cols-1 gap-4">
										{framesToDisplay.map((frame, index) => (
											<Image
												key={frame?.id}
												src={`https://${frame?.frame}`}
												alt={`frame-${index}`}
												width={1280}
												height={720}
												priority
											/>
										))}
									</div>
								</div>
								<div>
									{/* 스크립트 텍스트 부분 */}
									{sortedTextWithTimestamps.map((item, index) => (
										<span key={item.id}>
											{item.text}
											{index < sortedTextWithTimestamps.length - 1 &&
												' '}
										</span>
									))}
								</div>
							</div>
							<div
								style={{ pageBreakInside: 'avoid' }}
								className="bg-secondary text-secondary-foreground px-7 py-6 text-lg font-medium"
							>
								{segment.summarization.join(' ')}
							</div>
						</div>
					</A4Layer>
				)
			})}

			<A4Layer>
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-2">
						<div className="text-xl font-semibold">
							AI 요약 결과를 모아봤어요
						</div>
						<div className="text-secondary-foreground text-base">
							빌리브로 간편하게 영상을 요약해 보세요!
						</div>
					</div>
					<div className="flex flex-col gap-10 rounded-xl border p-10">
						{segments.map((segment) => {
							const firstTimestamp =
								segment.textWithTimestamps[0]?.timeStamp
							const lastTimestamp =
								segment.textWithTimestamps[
									segment.textWithTimestamps.length - 1
								]?.timeStamp

							return (
								<div key={`summary-${segment.id}`}>
									<div className="w-full overflow-hidden rounded-lg border">
										<div className="bg-secondary flex w-full justify-between px-5 py-3 text-base font-semibold">
											<div>{segment.title}</div>
											<div className="text-secondary-foreground text-sm font-medium">
												{firstTimestamp
													? formatTimestamp(firstTimestamp)
													: '00:00:00'}{' '}
												-{' '}
												{lastTimestamp
													? formatTimestamp(lastTimestamp)
													: '00:00:00'}
											</div>
										</div>
										<div className="flex gap-6 px-5 py-4">
											<Image
												src={`https://${segment.frames[0]?.frame}`}
												alt="segment frame"
												width={320}
												height={180}
												priority
											/>
											<div>{segment.summarization.join(' ')}</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</A4Layer>

			<A4Layer>
				<div className="flex w-full flex-col gap-10">
					<div className="text-xl font-semibold">
						앞서 요약한 내용을 바탕으로 문제를 준비했어요
					</div>
					<div className="flex flex-col gap-10">
						{questions.map((question, index) => (
							<div key={`question-${question.id}`}>
								<div className="overflow-hidden rounded-xl border">
									<div className="bg-secondary px-5 py-3 text-base font-semibold">
										문제 {index + 1}
									</div>
									<div className="flex gap-6 px-5 py-4">
										<div>{question.question}</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</A4Layer>

			<A4Layer>
				<div className="flex w-full flex-col gap-10">
					<div className="text-xl font-semibold">
						문제의 답을 확인해 보세요
					</div>
					<div className="flex flex-col gap-10">
						{questions.map((question, index) => (
							<div key={`question-${question.id}`}>
								<div className="overflow-hidden rounded-xl border">
									<div className="bg-secondary flex gap-3 px-5 py-3">
										<div className="text-base font-semibold">
											문제 {index + 1}
										</div>
										<div className="text-base">
											{question.question}
										</div>
									</div>
									<div className="flex gap-6 px-5 py-4">
										<div>{question.answer}</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</A4Layer>
		</div>
	)
}
