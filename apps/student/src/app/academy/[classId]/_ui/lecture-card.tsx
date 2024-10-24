import Image from 'next/image'
import { Icon } from '@design-system/icon'
import { type GetLectures } from '@/module/academy/model'
import defaultImage from '@/lib/asset/image/square-default-image.png'

interface LectureCardProps {
	lectures: GetLectures
	isLast: boolean
}

// 날짜 포맷 함수
function formatDate(date: Date) {
	const year = date.getFullYear().toString().slice(2)
	const month = date.getMonth() + 1
	const day = date.getDate()
	const weekDay = date.toLocaleDateString('ko-KR', {
		weekday: 'short'
	})

	return `${year}년 ${month}월 ${day}일(${weekDay})`
}

export function LectureCard({
	lectures,
	isLast
}: LectureCardProps) {
	return (
		<div
			className={`flex flex-col gap-4 py-4 ${
				!isLast ? 'border-border border-b' : ''
			}`}
		>
			<div className="flex gap-4">
				<Image
					src={lectures.thumbnailUrl || defaultImage}
					alt="thumbnail"
					width={80}
					height={80}
					className="aspect-square h-20 w-20 rounded-lg object-cover"
				/>
				<div className="flex flex-col justify-between gap-2">
					<div className="flex flex-col gap-1">
						<div className="max-pc:flex-col max-pc:items-start flex items-center gap-2">
							<div className="text-sm font-bold">
								{lectures.name}
							</div>
						</div>
						<div className="text-secondary-foreground line-clamp-1 text-sm font-medium">
							{lectures.description}
						</div>
					</div>
					<div className="text-secondary-foreground max-pc:flex-col max-pc:items-start pc:items-center pc:gap-4 flex gap-2 text-sm font-medium">
						<div className="flex items-center gap-[5px]">
							<Icon
								name="PresentationFill"
								size={18}
								className="text-muted-foreground"
							/>
							<div>
								{lectures.academyMembers.length > 0 ? (
									<>
										{lectures.academyMembers[0]?.user?.name}
										{lectures._count.academyMembers > 1 && (
											<> 외 {lectures._count.academyMembers - 1}명</>
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
							<div>{formatDate(new Date(lectures.date))}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
