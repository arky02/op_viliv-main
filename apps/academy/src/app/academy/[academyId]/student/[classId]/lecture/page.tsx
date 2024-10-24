import { academyService } from '@/module/academy/service'
import { academyMemberService } from '@/module/academyMember/service'
import { LectureList } from '../_ui/lecture-list'
import { LectureEmpty } from '../_ui/lecture-empty'
import { LectureFilter } from '../_ui/lecture-filter'

interface AcademyClassLecturePageProps {
	params: {
		academyId: string
		classId: string
	}
	searchParams: {
		startDate: string
		endDate: string
		memberId: string
	}
}

export default async function AcademyClassLecturePage({
	params,
	searchParams
}: AcademyClassLecturePageProps) {
	const filteredLectures =
		await academyService.getFilteredLectures(params.classId, {
			startDate: searchParams.startDate,
			endDate: searchParams.endDate,
			memberId: searchParams.memberId
		})

	const allMembers = await academyMemberService.getMembers(
		params.academyId
	)

	const members = allMembers.filter(
		(member) => !member.isPending
	)

	return (
		<div>
			<LectureFilter members={members} params={params} />
			<div>
				{filteredLectures.length > 0 ? (
					<LectureList
						lectures={filteredLectures}
						params={params}
					/>
				) : (
					<LectureEmpty params={params} />
				)}
			</div>
		</div>
	)
}
