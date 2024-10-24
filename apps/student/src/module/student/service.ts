import { db } from '@core/models'

class StudentService {
	async createStudent(
		academyId: string,
		academyClassId: string,
		phoneNumber: string,
		userId: string
	) {
		const student = await db.student.create({
			data: {
				academyId,
				academyClassId,
				phoneNumber,
				userId
			}
		})
		return student
	}
}

export const studentService = new StudentService()
