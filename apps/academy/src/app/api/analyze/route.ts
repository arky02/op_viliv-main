/* eslint-disable camelcase */
import { db } from '@core/models'
import { NextResponse } from 'next/server'

//TODO
export async function POST(request: Request) {
	try {
		const json = await request.json()
		console.log('Webhook payload: ', json)

		const { segments, questions, full_summerization, thumbnails_id, error } =
			json
		const lectureId = json.lecture_id

		console.log("json",json)

		console.log('frames payload: ', segments[0].frames)

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

		console.log('thumbnails_id', thumbnails_id)

		const analyzedLecture = await db.analyzedLecture.create({
			data: {
				lectureId,
				thumbnailsId: thumbnails_id
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
							frames_id
						} = segment

						if (frames && frames.length > 0) {
							return db.segment.create({
								data: {
									title,
									timeStamp: Number(time_stamp),
									summarization,
									frames: {
										createMany: {
											data: frames.map((frame: string, index: number) => ({
												frame,
												frameId: frames_id[index],  // 여기서 frames_id를 매칭해줌
											})),
										},
									},
									framesId: frames_id,
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

		console.log("segmentPromises",segmentPromises)
		console.log("segments",segments)

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
