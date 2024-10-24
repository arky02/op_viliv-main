'use client'

import Link from 'next/link'
import { type GetLectures } from '@/module/academy/model'
import { LectureCard } from './lecture-card'

interface LectureListProps {
	lectures: GetLectures[]
	params: {
		classId: string
	}
}

// 날짜를 기준으로 lectures를 그룹화
function groupLecturesByDate(lectures: GetLectures[]) {
	return lectures.reduce<Record<string, GetLectures[]>>(
		(groups, lecture) => {
			const lectureDate = formatDate(new Date(lecture.date))
			if (!groups[lectureDate]) {
				groups[lectureDate] = []
			}
			groups[lectureDate]?.push(lecture)
			return groups
		},
		{}
	)
}

export function LectureList({
	lectures,
	params
}: LectureListProps) {
	// lectures를 날짜별로 그룹화
	const groupedLectures = groupLecturesByDate(lectures)

	return (
		<div>
			<div className="pc:px-[120px] px-4 py-6">
				{Object.entries(groupedLectures).map(
					([lectureDate, groupLectures]) => (
						<div
							key={lectureDate}
							className="bg-background mb-4 rounded-lg border p-4 shadow"
						>
							<div className="text-sm font-bold">
								{lectureDate}
							</div>
							{groupLectures.map((lecture, index) => (
								<Link
									key={lecture.id}
									href={`/academy/${params.classId}/lecture/${lecture.id}/detail`}
								>
									<LectureCard
										lectures={lecture}
										isLast={index === groupLectures.length - 1}
									/>
								</Link>
							))}
						</div>
					)
				)}
			</div>
		</div>
	)
}

function formatDate(date: Date) {
	const year = date.getFullYear().toString().slice(2)
	const month = date.getMonth() + 1
	const day = date.getDate()
	const weekDay = date.toLocaleDateString('ko-KR', {
		weekday: 'short'
	})

	return `${year}년 ${month}월 ${day}일(${weekDay})`
}
