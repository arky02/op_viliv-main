import { Badge } from '@design-system/ui'
import { type LectureStatus } from '@core/models'
import { type GetLectures } from '@/module/academy/model'

interface LectureBadgeProps {
	lectures: GetLectures
}

const getBadgeByStatus = (status: LectureStatus) => {
	switch (status) {
		case 'PENDING':
			return (
				<Badge
					variant="secondary"
					size="sm"
					className="rounded-sm"
				>
					업로드 진행중
				</Badge>
			)
		case 'ONREVIEW':
			return (
				<Badge
					variant="secondary"
					size="sm"
					className="rounded-sm bg-[#FF64461A] text-[#FF6446]"
				>
					검토필요
				</Badge>
			)
		case 'FAILED':
			return (
				<Badge
					variant="secondary"
					size="sm"
					className="text-negative rounded-sm bg-[#F43E5C1A]"
				>
					업로드 실패
				</Badge>
			)
		case 'OPENED':
			return (
				<Badge
					variant="secondary"
					size="sm"
					className="text-primary rounded-sm bg-[#3C83F61A]"
				>
					공개
				</Badge>
			)
		case 'CLOSED':
			return (
				<Badge
					variant="secondary"
					size="sm"
					className="rounded-sm"
				>
					숨김
				</Badge>
			)
	}
}

export function LectureBadge({
	lectures
}: LectureBadgeProps) {
	const { status } = lectures

	return <div>{getBadgeByStatus(status)}</div>
}
