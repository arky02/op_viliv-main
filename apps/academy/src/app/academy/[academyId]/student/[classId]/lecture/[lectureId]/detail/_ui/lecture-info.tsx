import { Icon } from '@design-system/icon'
import { type GetLectureInfo } from '@/module/lecture/model'
import { formatDate } from '@/lib/util/format-date'
import { LectureBadge } from '../../../../_ui/lecture-badge'

interface LectureInfoProps {
	lecture: GetLectureInfo
}

export function LectureInfo({ lecture }: LectureInfoProps) {
	return (
		<div className="max-pc:flex-col max-pc:gap-2 flex w-full flex-1 gap-3">
			<LectureBadge lectures={lecture} />
			<div className="flex flex-col gap-2">
				<div className="pc:text-xl text-base font-semibold">
					{lecture.name}
				</div>
				<div className="text-secondary-foreground max-pc:items-start pc:items-center pc:gap-4 flex gap-2 text-sm font-medium">
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
	)
}
