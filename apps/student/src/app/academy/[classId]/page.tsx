import { academyService } from '@/module/academy/service'
import { academyMemberService } from '@/module/academyMember/service'
import { academyClassService } from '@/module/academyClass/service'
import { LectureEmpty } from './_ui/lecture-empty'
import { LectureList } from './_ui/lecture-list'
import { LectureHeader } from './_ui/lecture-header'
import { LectureFilter } from './_ui/lecture-filter'

interface AcademyClassDetailPageProps {
	params: {
		classId: string
	}
	searchParams: {
		startDate: string
		endDate: string
		memberId: string
	}
}

export default async function AcademyClassDetailPage({
	params,
	searchParams
}: AcademyClassDetailPageProps) {
	const filteredLectures =
		await academyService.getFilteredLectures(params.classId, {
			startDate: searchParams.startDate,
			endDate: searchParams.endDate,
			memberId: searchParams.memberId
		})

	const classInfo = await academyClassService.getClassInfo(
		params.classId
	)

	const allMembers = await academyMemberService.getMembers(
		classInfo.academyId
	)

	const members = allMembers.filter(
		(member) => !member.isPending
	)

	return (
		<div className="flex flex-col">
			<LectureHeader classInfo={classInfo} />
			<LectureFilter members={members} />
			<div>
				{filteredLectures.length > 0 ? (
					<LectureList
						params={params}
						lectures={filteredLectures}
					/>
				) : (
					<LectureEmpty />
				)}
			</div>
		</div>
	)
}
