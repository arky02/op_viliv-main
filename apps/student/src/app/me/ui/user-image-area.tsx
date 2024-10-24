'use client'

import { useState } from 'react'
import { useAction } from '@core/react'
import { ProfileImageSection } from '@/app/academy/_ui/profile-image-section'
import { type GetMyUserInfo } from '@/module/user/model'
import { imageUpdateAction } from '@/module/user/action'

interface UserImageAreaProps {
	userInfo: GetMyUserInfo
}

export function UserImageArea({
	userInfo
}: UserImageAreaProps) {
	const [profileImage, setProfileImage] = useState(
		userInfo.image
	)

	const profileImageUpdateAction = useAction(
		imageUpdateAction
	)

	function handelImageUrl(imageUrl: string) {
		setProfileImage(imageUrl)
		profileImageUpdateAction.execute({ image: imageUrl })
	}

	return (
		<div className="flex gap-4">
			<ProfileImageSection
				value={profileImage || ''}
				onChange={(imageUrl) => {
					handelImageUrl(imageUrl as string)
				}}
			/>
		</div>
	)
}
