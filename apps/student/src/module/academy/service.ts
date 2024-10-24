import { db } from '@core/models'
import {
	getAcademyInfoInclude,
	getLecturesInclude,
	getAcademiesInclude
} from '@/module/academy/model'

class AcademyService {
	async getAcademiesList(phoneNumber: string) {
		const academies = await db.academy.findMany({
			where: {
				students: {
					some: {
						phoneNumber
					}
				}
			},
			include: getAcademiesInclude,
			orderBy: {
				name: 'asc'
			}
		})

		return academies
	}

	async getLectures(id: string) {
		const lectures = await db.lecture.findMany({
			where: {
				academyClassId: id,
				status: 'OPENED'
			},
			include: getLecturesInclude
		})

		return lectures
	}

	async getFilteredLectures(
		classId: string,
		filters: {
			startDate?: string
			endDate?: string
			memberId?: string
		}
	) {
		const { startDate, endDate, memberId } = filters

		const start = startDate ? new Date(startDate) : undefined
		const end = endDate ? new Date(endDate) : undefined

		const lectures = await db.lecture.findMany({
			where: {
				academyClassId: classId,
				status: 'OPENED',
				...(start &&
					end && {
						date: {
							gte: start,
							lte: end
						}
					}),
				...(start &&
					!end && {
						date: {
							gte: start
						}
					}),
				...(end &&
					!start && {
						date: {
							lte: end
						}
					}),
				...(memberId && {
					academyMembers: {
						some: {
							id: memberId
						}
					}
				})
			},
			orderBy: {
				date: 'desc'
			},
			include: getLecturesInclude
		})

		return lectures
	}

	async getAcademyInfo(id: string) {
		const academyInfo = await db.academy.findUniqueOrThrow({
			where: { id },
			include: getAcademyInfoInclude
		})
		return academyInfo
	}

	async searchAcademies(keyword: string) {
		const academies = await db.academy.findMany({
			where: {
				name: {
					contains: keyword
				}
			},
			include: getAcademiesInclude,
			orderBy: {
				name: 'asc'
			}
		})
		return academies
	}
}

export const academyService = new AcademyService()
