import { db } from '@core/models'
import { getStudentsInclude } from './model'

class StudentService {
	async getStudents(id: string) {
		const students = await db.student.findMany({
			where: { academyClassId: id },
			include: getStudentsInclude
		})
		return students
	}

	async acceptStudent(studentId: string) {
		await db.student.update({
			where: {
				id: studentId
			},
			data: {
				isPending: false
			}
		})
	}

	async rejectStudent(studentId: string) {
		await db.student.delete({
			where: {
				id: studentId
			}
		})
	}
}

export const studentService = new StudentService()
