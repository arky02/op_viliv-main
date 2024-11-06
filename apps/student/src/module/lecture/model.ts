import { type Prisma } from '@core/models'

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
            select: { id: true, timeStamp: true,segmentId: true, text: true },
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
