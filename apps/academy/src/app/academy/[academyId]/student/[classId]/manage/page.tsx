import { academyClassService } from '@/module/academyClass/service'
import { studentService } from '@/module/student/service'
import { userService } from '@/module/user/service'
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

	const deviceChangeRequests = students
		.filter((el) => el.user?.device_change_reason)
		.map((student) => {
			const getDeviceChangeReason = async () =>
				student.userId
					? await userService.getDeviceChangeReasonByUserId(
							student.userId
						)
					: { value: '' }
			return {
				student,
				deviceChangeReason: getDeviceChangeReason()
			}
		})

	return (
		<StudentsManageList
			academyClassInfo={academyClassInfo}
			students={students}
			deviceChangeRequests={deviceChangeRequests}
		/>
	)
}
