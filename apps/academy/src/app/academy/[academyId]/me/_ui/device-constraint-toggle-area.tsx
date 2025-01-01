'use client'

import { Switch } from '@design-system/ui'
import { useAction } from '@core/react'
import { toggleDeviceConstraintAction } from '@/module/academy/action'
import { type GetAcademyInfo } from '@/module/academy/model'

interface DeviceConstrainToggleAreaProps {
	academyInfo: GetAcademyInfo
}

export function DeviceConstraintToggleArea({
	academyInfo
}: DeviceConstrainToggleAreaProps) {
	const switchAction = useAction(
		toggleDeviceConstraintAction
	)

	function handleToggleDeviceConstraint(checked: boolean) {
		switchAction.execute({
			academyId: academyInfo.id,
			isConstrained: checked
		})
	}

	return (
		<div className="flex items-center justify-between">
			<div className="font-semibold">기기 접근 제한 설정</div>
			<Switch
				defaultChecked={
					!!academyInfo?.device_constraint_enabled
				}
				onCheckedChange={handleToggleDeviceConstraint}
			/>
		</div>
	)
}
