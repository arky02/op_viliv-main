import { db } from '@core/models'
import { getClassInfoInclude } from './model'

class AcademyClassService {
	async verifyInviteCode(
		academyId: string,
		inviteCode: string
	) {
		const academyClass = await db.academyClass.findFirst({
			where: {
				academyId,
				inviteCode
			}
		})
		return academyClass
	}

	async getMyPendingClasses(userId: string) {
		const classes = await db.academyClass.findMany({
			where: {
				students: {
					some: {
						userId,
						isPending: true
					}
				}
			},
			include: getClassInfoInclude,
			orderBy: {
				name: 'asc'
			}
		})
		return classes
	}

	async getMyJoinedClasses(userId: string) {
		const classes = await db.academyClass.findMany({
			where: {
				students: {
					some: {
						userId,
						isPending: false
					}
				}
			},
			include: getClassInfoInclude,
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
}

export const academyClassService = new AcademyClassService()
