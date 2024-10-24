import { db } from '@core/models'
import {
	type CreateAcademyDto,
	getAcademyInfoInclude,
	getLecturesInclude
} from '@/module/academy/model'
import { getAcademiesInclude } from '@/module/academy/model'

class AcademyService {
	async getAcademiesList(phoneNumber: string) {
		const academies = await db.academy.findMany({
			where: {
				academyMembers: {
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

	async createAcademy(dto: CreateAcademyDto) {
		const newPlan = await db.plan.create({
			data: {
				name: 'FREE',
				duration: 14,
				contentsLimit: 360000,
				academyMemberLimit: 1
			}
		})
		const academy = await db.academy.create({
			data: {
				name: dto.name,
				image: dto.image,
				address: dto.address,
				postCode: dto.postalCode,
				addressDetail: dto.detailAddress,
				planId: newPlan.id,
				academyMembers: {
					create: {
						phoneNumber: dto.phoneNumber,
						role: 'OWNER',
						isPending: false
					}
				}
			}
		})

		return academy
	}

	async getLectures(id: string) {
		const lectures = await db.lecture.findMany({
			where: { academyClassId: id },
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

	async spendCredit(
		academyId: string,
		videoLengthInSeconds: number
	) {
		await db.academy.update({
			where: { id: academyId },
			data: {
				credit: {
					decrement: videoLengthInSeconds
				}
			}
		})
	}
}

export const academyService = new AcademyService()
