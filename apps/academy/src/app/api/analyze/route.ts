/* eslint-disable camelcase */
import { db } from '@core/models'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		console.log("Webhook request",request)
		const json = await request.json()
		console.log('Webhook payload: ', json)

		const { segments, questions, full_summerization, thumbnails_id, error } =
			json
		const lectureId = json.lecture_id

    // Webhook 응답 결과 출력
		console.log("Webhook json",json)
		console.log('Webhook frames segment: ', segments)
		console.log("Webhook summary_markup",segments[0]?.summary_markup)
		console.log("Webhook summary_markup type",typeof segments[0]?.summary_markup)

		if (error) {
			await db.lecture.update({
				where: { id: lectureId },
				data: {
					status: 'FAILED'
				}
			})

			return new NextResponse('Error in payload', {
				status: 400
			})
		}

		const lecture = await db.lecture.findUnique({
			where: { id: lectureId }
		})

		if (!lecture) {
			return new NextResponse('Lecture not found', {
				status: 404
			})
		}

		await db.lecture.update({
			where: { id: lectureId },
			data: {
				description: full_summerization
					? full_summerization[0]
					: null,
				status: 'ONREVIEW',
				thumbnailUrl:
					segments &&
					segments.length > 0 &&
					segments[0].frames &&
					segments[0].frames.length > 0
						? `https://${segments[0].frames[0]}`
						: null
			}
		})

		const thumbnailsIdStr = thumbnails_id.toString().replaceAll(' ','')

		const analyzedLecture = await db.analyzedLecture.create({
			data: {
				lectureId,
				thumbnailsId: thumbnailsIdStr
			}
		})

		const segmentPromises =
			segments && Array.isArray(segments)
				? segments.map((segment) => {

						const {
							title,
							time_stamp,
							summarization,
							text_with_timestamp,
							frames,
							frames_id,
							summary_markup
						} = segment

						console.log("Webhook segment summary_markup",summary_markup)	
						console.log("Webhook segment summary_markup type", typeof summary_markup)	

						if (frames && frames.length > 0) {
							return db.segment.create({
								data: {
									title,
									timeStamp: Number(time_stamp),
									summarization,
									frames: {
										createMany: {
											data: frames.map((frame: string, index: number) => {
												const frameId = frames_id[index].toString()  // 여기서 frames_id를 매칭해줌
									
												return 	({
													frame,
													frameId,
													isThumbnail: thumbnailsIdStr.split(',').includes(frameId)
												})
										}),
										},
									},
									framesId: frames_id.toString(),
									summaryMarkup: summary_markup,
									textWithTimestamps: {
										createMany: {
											data: text_with_timestamp.map(
												(text: {
													text: string
													time_stamp: number
												}) => ({
													text: text.text,
													timeStamp: text.time_stamp
												})
											)
										}
									},
									analyzedLectureId: analyzedLecture.id
								}
							})
						}
						return null
					})
				: []

		const questionPromises =
			questions && Array.isArray(questions)
				? questions.map((question) => {
						const { question: questionText, answer } = question

						return db.question.create({
							data: {
								question: questionText,
								answer,
								analyzedLectureId: analyzedLecture.id
							}
						})
					})
				: []

		await Promise.all([
			...segmentPromises,
			...questionPromises
		])

		return new NextResponse('Success!', { status: 200 })
	} catch (error: unknown) {
		console.error('Webhook error: ', error)
		return new NextResponse(
			`Webhook error: ${(error as Error).message}`,
			{
				status: 400
			}
		)
	}
}
