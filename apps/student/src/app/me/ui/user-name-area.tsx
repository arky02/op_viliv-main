'use client'

import { Button, Input, toast } from '@design-system/ui'
import { useState } from 'react'
import { useAction } from '@core/react'
import { updateUserNameAction } from '@/module/user/action'
import { type GetMyUserInfo } from '@/module/user/model'

interface UserNameAreaProps {
	userInfo: GetMyUserInfo
}

export function UserNameArea({
	userInfo
}: UserNameAreaProps) {
	const [name, setName] = useState(userInfo.name || '')

	const handleNameChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setName(e.target.value)
	}

	const updateUserName = useAction(updateUserNameAction, {
		onSuccess: () => {
			toast({
				title: '이름이 변경되었습니다.',
				variant: 'positive'
			})
		},
		onError: () => {
			toast({
				title: '이름 변경에 실패했습니다.',
				variant: 'negative'
			})
		}
	})

	const handleSubmit = () => {
		if (name.trim() === '') {
			toast({
				title: '이름을 입력해주세요.',
				variant: 'negative'
			})
			return
		}
		updateUserName.execute(name)
	}

	return (
		<div className="flex gap-2">
			<Input
				value={name}
				onChange={handleNameChange}
				className="flex-1"
				maxLength={7}
			/>
			<Button onClick={handleSubmit} variant="secondary">
				저장하기
			</Button>
		</div>
	)
}
