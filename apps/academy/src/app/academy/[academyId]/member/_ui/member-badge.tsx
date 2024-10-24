import { Badge } from '@design-system/ui'
import { type GetMembers } from '@/module/academyMember/model'

interface MemberCardProps {
	member: GetMembers
}

export function MemberBadge({ member }: MemberCardProps) {
	let badgeText

	if (member.role === 'OWNER') {
		badgeText = '원장'
	} else if (member.role === 'MANAGER') {
		badgeText = '관리자'
	} else {
		badgeText = '강사'
	}

	return (
		<Badge variant="secondary" size="sm">
			{badgeText}
		</Badge>
	)
}
