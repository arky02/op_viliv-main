'use client'

import { Switch } from '@design-system/ui'
import { useState } from 'react'
import { useAction } from '@core/react'
import { type GetLectureInfo } from '@/module/lecture/model'
import { switchLectureOpenedAction } from '@/module/lecture/action'

interface LectureStatusSwitchProps {
	lecture: GetLectureInfo
}

export function LectureStatusSwitch({
	lecture
}: LectureStatusSwitchProps) {
	const [isOpened, setIsOpened] = useState(
		lecture.status === 'OPENED'
	)

	const switchAction = useAction(switchLectureOpenedAction)

	function handleStatusChange(checked: boolean) {
		const newIsOpened = checked
		setIsOpened(newIsOpened)

		const lectureStatus = newIsOpened ? 'OPENED' : 'CLOSED'

		switchAction.execute({
			lectureId: lecture.id,
			lectureStatus
		})
	}

	return (
		<Switch
			defaultChecked={isOpened}
			onCheckedChange={handleStatusChange}
		/>
	)
}
