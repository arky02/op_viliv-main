'use client'

/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from 'react'
import { Badge, Button } from '@design-system/ui'
import Image from 'next/image'
import { Icon } from '@design-system/icon'
import { useImgTypeState } from '@core/react/zustand/imgtype-store'
import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import defaultImage from '@/lib/asset/image/horizontal-default-image.png'
import { type GetLectureInfo } from '@/module/lecture/model'
import { downloadPDF } from '@/hook/download-pdf'
import { convertToTimeFormatNumber } from '@/lib/util/conver-to-time-format-number'
import { userService } from '@/module/user/service'
import { TimestampAccordion } from './timestamp-accordion'
import { LectureInfo } from './lecture-info'
import { LectureImgTypeSelect } from './lecture-img-type-select'
import Slider from './lecture-slider'
import VideoWithWatermark from './video-with-watermark'

const THUMBNAIL_IMG_BASE_URL = 'viliv.ngrok.dev/api/frames/'

interface LectureDetailAreaProps {
	lecture: GetLectureInfo
}

interface Frame {
	frame: string
	isThumbnail: boolean
	frameId: string
}

export function LectureDetailArea({
	lecture
}: LectureDetailAreaProps) {
	const { analyzedLecture } = lecture
	const { segments = [] } = analyzedLecture || {}
	const [userPhoneNum, setUserPhoneNum] = useState<
		string | null
	>(null)

	const imgType = useImgTypeState()

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
		const url = `${window.location.origin}/pdf/${lecture.id}?type=${imgType}`
		await downloadPDF(url)
	}

	useEffect(() => {
		const getPhoneNumber = async () => {
			const session = await authService.getMySession()
			if (!session) redirect('/start')

			console.log("Session ", session)
			console.log("userId ", session.user.id)

			const phoneNumber =
				await userService.getPhoneNumberByUserId(
					session.user.id
				)
			console.log("Phone ", phoneNumber)
			if (!phoneNumber) {
				redirect('/error')
			}
			setUserPhoneNum(phoneNumber)
		}

		void getPhoneNumber()
	}, [])

	console.log("user pn", userPhoneNumber)

	return (
		<div className="flex flex-col">
			{/* 모바일 비디오 */}
			<VideoWithWatermark
				src={lecture.videoUrl}
				videoRef={mobileVideoRef}
				device="mobile"
				watermarkText={userPhoneNum || 'VILIV'}
			/>
			<div className="pc:hidden flex items-center p-4">
				<LectureInfo lecture={lecture} />
				<LectureImgTypeSelect size="sm" />
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
					<VideoWithWatermark
						src={lecture.videoUrl}
						videoRef={pcVideoRef}
						watermarkText={userPhoneNum || 'VILIV'}
					/>
					<div className="flex flex-col gap-4 rounded-md border p-6">
						<div className="flex items-center justify-between">
							<div className="text-lg font-semibold">
								강의 전체 요약
							</div>
						</div>
						<div className="max-h-[320px] overflow-y-auto text-sm">
							{lecture.description}
						</div>
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
							// 썸네일 이미지가 없을 경우 첫 번째 이미지를 썸네일로 설정
							framesToDisplay = [
								segment.frames[0] || {
									id: '',
									frame: '',
									frameId: '',
									isThumbnail: false,
									segmentId: ''
								}
							]
						}

						if (imgType) {
							framesToDisplay = framesToDisplay.map(
								(frame: Frame) => {
									//thumbnailFrames.length > 0 : viliv.ngrok.dev/api/frames//cm2a4uoo2000113rj6bsjvxql/white_ver_dir/225.jpg
									//thumbnailFrames.length <= 0 : viliv.ngrok.dev/api/frames/cm2a4l64d00012101y6xqkoe6/1695.jpg

									const lectureId = frame.frame
										.replace('//', '/')
										.replace(THUMBNAIL_IMG_BASE_URL, '')
										.split('/')[0]

									const thumbnailUrlToDisplay = `${THUMBNAIL_IMG_BASE_URL}${lectureId}${imgType === 'default' ? '' : `/${imgType}`}/${frame.frameId}.jpg`

									return {
										...frame,
										frame: thumbnailUrlToDisplay
									}
								}
							)
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
									<Slider>
										{framesToDisplay.map((frame, idx) => {
											return (
												<Image
													key={idx}
													src={`https://${frame.frame}`}
													alt={segment.title}
													width={640}
													height={360}
													className="flex h-fit w-full flex-shrink-0"
												/>
											)
										})}
									</Slider>
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
