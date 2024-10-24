import { db } from '@core/models'
import {
	type CreateClassDto,
	type UpdateClassDto,
	getClassInfoInclude,
	getClassesInclude
} from './model'

class AcademyClassService {
	async getClasses(id: string) {
		const classes = await db.academyClass.findMany({
			where: { academyId: id },
			include: getClassesInclude,
			orderBy: {
				name: 'asc'
			}
		})
		return classes
	}

	//경고 : 레이아웃에서만 사용하시오
	async getClassInfo(id: string) {
		const classInfo = await db.academyClass.findUniqueOrThrow(
			{
				where: { id },
				include: getClassInfoInclude
			}
		)
		return classInfo
	}

	async createClass(dto: CreateClassDto) {
		return await db.academyClass.create({
			data: {
				academyId: dto.academyId,
				name: dto.name,
				description: dto.description,
				inviteCode: dto.inviteCode,
				academyMembers: {
					connect: dto.academyMemberId.map((id) => ({
						id
					}))
				}
			},
			include: { academyMembers: true }
		})
	}

	async updateClass(dto: UpdateClassDto) {
		return await db.academyClass.update({
			where: { id: dto.classId },
			data: {
				name: dto.name,
				description: dto.description,
				academyMembers: {
					connect: dto.academyMemberId.map((id) => ({
						id
					}))
				}
			}
		})
	}

	async deleteClass(id: string) {
		return await db.academyClass.delete({
			where: { id }
		})
	}

	async updateInviteCode(
		classId: string,
		inviteCode: string
	) {
		return await db.academyClass.update({
			where: { id: classId },
			data: { inviteCode }
		})
	}
}

export const academyClassService = new AcademyClassService()
