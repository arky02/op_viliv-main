'use client'

import Image from 'next/image'
import { useState } from 'react'
import { type AcademyMemberRole } from '@core/models'
import { formatPhoneNumber } from '@core/utils'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { type GetMembers } from '@/module/academyMember/model'
import { MemberBadge } from './member-badge'
import { MemberRemoveModal } from './member-remove-modal'
import { MemberRoleEditModal } from './member-role-edit-modal'
import { InviteMemberModal } from './invite-member-modal'

interface MemberCardListProps {
	members: GetMembers[]
	memberRole: AcademyMemberRole
	academyId: string
}

interface MemberCardProps {
	member: GetMembers
	memberRole: AcademyMemberRole
}

export function MemberCardList({
	members,
	memberRole,
	academyId
}: MemberCardListProps) {
	const [filter, setFilter] = useState<'강사' | '대기중'>(
		'강사'
	)
	const filteredMembers = members.filter((member) => {
		if (filter === '강사') {
			return !member.isPending
		}
		return member.isPending
	})
	return (
		<div className="flex flex-col">
			{memberRole !== 'TEACHER' && (
				<div className="pc:px-8 pc:pt-6 flex justify-between p-4">
					<div className="bg-muted max-pc:w-full flex items-center rounded-md p-1 text-sm font-medium">
						<div
							className={`max-pc:w-1/2 rounded-sm px-4 py-2 text-center hover:cursor-pointer ${filter === '강사' ? 'bg-background' : 'bg-muted'}`}
							onClick={() => setFilter('강사')}
						>
							강사
						</div>
						<div
							className={`max-pc:w-1/2 rounded-sm px-4 py-2 text-center hover:cursor-pointer ${filter === '대기중' ? 'bg-background' : 'bg-muted'}`}
							onClick={() => setFilter('대기중')}
						>
							대기중
						</div>
					</div>
					<InviteMemberModal academyId={academyId} />
				</div>
			)}
			<div className="pc:gap-4 bg-background pc:m-8 m-4 grid grid-cols-1 gap-3 divide-y rounded-xl border p-5 shadow">
				{filteredMembers.map((member) => (
					<MemberCard
						key={member.id}
						member={member}
						memberRole={memberRole}
					/>
				))}
				{filteredMembers.length === 0 && (
					<div className="flex h-full items-center justify-center">
						<div className="text-secondary-foreground text-sm">
							{filter} 멤버가 없습니다.
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export function MemberCard({
	member,
	memberRole
}: MemberCardProps) {
	return (
		<div className="max-pc:flex-col flex justify-between gap-4 p-2 pt-4">
			<div className="flex gap-4">
				<Image
					src={defaultImage}
					width={44}
					height={44}
					alt="userProfile"
					className="rounded-full border"
				/>
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<div className="text-sm font-semibold">
							{member.user?.name || '대기 중인 회원'}
						</div>
						<MemberBadge member={member} />
					</div>
					<div className="text-secondary-foreground text-xs">
						{formatPhoneNumber(member.phoneNumber ?? '')}
					</div>
				</div>
			</div>
			{/* memberCard의 대상이 강사일 때 접속자가 강사가 아니거나, 
			    memberCard의 대상이 관리자일 때 접속자가 원장일 경우에만 보입니다 */}
			{((member.role === 'TEACHER' &&
				memberRole !== 'TEACHER') ||
				(member.role === 'MANAGER' &&
					memberRole === 'OWNER')) && (
				<div className="flex gap-2">
					<MemberRoleEditModal
						academyMemberId={member.id}
						memberRole={member.role}
					/>
					<MemberRemoveModal academyMemberId={member.id} />
				</div>
			)}
		</div>
	)
}
