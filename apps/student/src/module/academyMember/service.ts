import { db } from '@core/models'
import { getMembersInclude } from './model'

class AcademyMemberService {
	async getMembers(id: string) {
		const members = await db.academyMember.findMany({
			where: { academyId: id },
			include: getMembersInclude
		})
		return members
	}
}

export const academyMemberService =
	new AcademyMemberService()
