import { academyClassService } from '@/module/academyClass/service'
import {
	AcademyClassDetailHeaderDesktop,
	AcademyClassDetailHeaderMobile
} from './_ui/academy-class-detail-header'
import { AcademyClassDetailTab } from './_ui/academy-class-detail-tab'

interface AcademyClassDetailLayoutProps {
	children?: React.ReactNode
	params: {
		classId: number
	}
}

export default async function AcademyClassDetailLayout({
	children,
	params
}: AcademyClassDetailLayoutProps) {
	const classInfo = await academyClassService.getClassInfo(
		params.classId.toString()
	)

	const data = [
		{
			label: '강의 목록',
			href: `/academy/${classInfo.academy.id}/student/${classInfo.id}/lecture`
		},
		{
			label: '학생 관리',
			href: `/academy/${classInfo.academy.id}/student/${classInfo.id}/manage`
		}
	]

	return (
		<div className="flex">
			<div className="w-full">
				<AcademyClassDetailHeaderDesktop
					classInfo={classInfo}
				/>
				<AcademyClassDetailHeaderMobile classInfo={classInfo} />
				<AcademyClassDetailTab data={data} />
				<div className="w-full">{children}</div>
			</div>
		</div>
	)
}
