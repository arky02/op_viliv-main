'use client'

import { useAuth } from '@providers/auth'
import { Button } from '@design-system/ui'

export function LogOutButton() {
	const { signOut } = useAuth()

	const handleLogout = async () => {
		await signOut()
	}

	return (
		<Button
			onClick={handleLogout}
			variant="outline"
			className="w-fit"
		>
			로그아웃
		</Button>
	)
}
