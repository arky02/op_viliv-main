'use client'
import { Button } from '@design-system/ui'
import Link from 'next/link'
import { useState } from 'react'
import { type GetLectures } from '@/module/academy/model'
import { LectureCard } from './lecture-card'

interface LectureListProps {
	lectures: GetLectures[]
	params: {
		academyId: string
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
	const groupedLectures = groupLecturesByDate(lectures)

	const [isDropdownOpen, setIsDropdownOpen] =
		useState<boolean>(false)

	return (
		<div>
			<div className="pc:px-8 px-4 py-6">
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
									href={`/academy/${params.academyId}/student/${params.classId}/lecture/${lecture.id}/detail`}
								>
									<LectureCard
										params={params}
										lectures={lecture}
										isLast={index === groupLectures.length - 1}
										isDropdownOpen={isDropdownOpen}
										onDropdownToggle={(isOpen) =>
											setIsDropdownOpen(isOpen)
										} // 드롭다운 상태 업데이트 콜백
									/>
								</Link>
							))}
						</div>
					)
				)}
				<div className="pc:hidden bg-secondary fixed bottom-0 left-0 right-0 p-4">
					<Link
						href={`/academy/${params.academyId}/student/${params.classId}/lecture/create`}
					>
						<Button className="w-full">강의 추가</Button>
					</Link>
				</div>
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
