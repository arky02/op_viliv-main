import { type Prisma } from '@core/models'
import { z } from 'zod'

export const createLectureDto = z.object({
	academyId: z.string(),
	classId: z.string(),
	name: z.string(),
	date: z.date(),
	academyMemberId: z.array(z.string()),
	videoUrl: z.string(),
	videoDuration: z.number()
})
export type CreateLectureDto = z.infer<
	typeof createLectureDto
>

export const updateLectureDto = z.object({
	lectureId: z.string(),
	name: z.string(),
	date: z.date(),
	academyMemberId: z.array(z.string())
})
export type UpdateLectureDto = z.infer<
	typeof updateLectureDto
>

export const getLectureInfoInclude = { 
	_count: true,
  analyzedLecture: {
    select: {
      segments: {
        orderBy: { timeStamp: 'asc' },
        select: {
          id: true,
          title: true,
          timeStamp: true,
          summarization: true,
          framesId: true,
          textWithTimestamps: {
            orderBy: { timeStamp: 'asc' },
            select: { id: true, timeStamp: true, segmentId: true,text: true },
          },
          frames: true, // frames 관계형 데이터 포함
        },
      },
      questions: true,
      fullSummarization: true,
      thumbnailsId: true,
    },
  },
  academyMembers: {
    include: {
      user: true,  // academyMembers 관계 데이터 중 user 정보 포함
    },
  },
} satisfies Prisma.LectureInclude;

export type GetLectureInfo = Prisma.LectureGetPayload<{
  include: typeof getLectureInfoInclude;
}>;
