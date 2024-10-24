'use client'

import { Switch } from '@design-system/ui'
import { useAction } from '@core/react'
import { type GetMyAcademyMemberInfo } from '@/module/academyMember/model'
import { switchSubscriptionAction } from '@/module/academyMember/action'

interface UserSubscribedToggleAreaProps {
	academyMemberInfo: GetMyAcademyMemberInfo
}

export function UserSubscribedToggleArea({
	academyMemberInfo
}: UserSubscribedToggleAreaProps) {
	const academyMemberId = academyMemberInfo.id

	const switchAction = useAction(switchSubscriptionAction)
	function handleSubscribeCheck(checked: boolean) {
		switchAction.execute({
			academyMemberId,
			isSubscribed: checked
		})
	}

	return (
		<div className="flex items-center justify-between">
			<div className="font-semibold">
				학생 초대 요청 알림 여부
			</div>
			<Switch
				defaultChecked={academyMemberInfo.isAlertSubscribed}
				onCheckedChange={handleSubscribeCheck}
			/>
		</div>
	)
}
