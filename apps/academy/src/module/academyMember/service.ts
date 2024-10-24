import { type AcademyMemberRole, db } from '@core/models'
import {
	type GetMyAcademyMemberInfoDto,
	getMembersInclude,
	getMyAcademyMemberInfoInclude
} from './model'

class AcademyMemberService {
	async switchSubscription(
		academyMemberId: string,
		isSubscribed: boolean
	) {
		await db.academyMember.update({
			where: {
				id: academyMemberId
			},
			data: {
				isAlertSubscribed: isSubscribed
			}
		})
	}

	async removeMember(memberId: string) {
		await db.academyMember.delete({
			where: {
				id: memberId
			}
		})
	}

	async updateMemberRole(
		memberId: string,
		role: AcademyMemberRole
	) {
		await db.academyMember.update({
			where: {
				id: memberId
			},
			data: {
				role
			}
		})
	}

	async getMembers(id: string) {
		const members = await db.academyMember.findMany({
			where: { academyId: id },
			include: getMembersInclude
		})
		return members
	}

	async getMyAcademyMemberInfo(
		dto: GetMyAcademyMemberInfoDto
	) {
		return await db.academyMember.findFirst({
			where: {
				academyId: dto.academyId,
				phoneNumber: dto.phoneNumber
			},
			include: getMyAcademyMemberInfoInclude
		})
	}

	async inviteMember(
		academyId: string,
		phoneNumber: string,
		role: AcademyMemberRole
	) {
		await db.academyMember.create({
			data: {
				phoneNumber,
				role,
				academyId,
				isPending: true
			}
		})
	}

	async acceptMember(memberId: string) {
		await db.academyMember.update({
			where: {
				id: memberId
			},
			data: {
				isPending: false
			}
		})
	}
}

export const academyMemberService =
	new AcademyMemberService()
