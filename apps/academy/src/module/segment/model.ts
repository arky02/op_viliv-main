import { type Prisma } from '@core/models'
import { z } from 'zod'

export const segmentInfoInclude = {
	textWithTimestamps: true,
	frames: true
} satisfies Prisma.SegmentInclude
export type GetSegmentInclude = Prisma.SegmentGetPayload<{
	include: typeof segmentInfoInclude
}>

export const updateSegmentDto = z.object({
	segmentId: z.string(),
	title: z.string(),
	summarization: z.array(z.string()),
	frames: z.array(
		z.object({
			id: z.string(),
			frame: z.string(),
			isThumbnail: z.boolean()
		})
	),
	framesId: z.string(),
	textWithTimestamps: z.array(
		z.object({
			id: z.string(),
			timeStamp: z.number(),
			text: z.string()
		})
	)
})

export type UpdateSegmentDto = z.infer<
	typeof updateSegmentDto
>
