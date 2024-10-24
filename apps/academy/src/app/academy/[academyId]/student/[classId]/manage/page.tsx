import { academyClassService } from '@/module/academyClass/service'
import { studentService } from '@/module/student/service'
import { StudentsManageList } from '../_ui/students-manage-list'

interface AcademyClassManagePageProps {
	params: {
		classId: string
	}
}

export default async function AcademyClassManagePage({
	params
}: AcademyClassManagePageProps) {
	const academyClassInfo =
		await academyClassService.getClassInfo(params.classId)
	const students = await studentService.getStudents(
		params.classId
	)

	return (
		<StudentsManageList
			academyClassInfo={academyClassInfo}
			students={students}
		/>
	)
}
