'use client'

import { Icon } from '@design-system/icon'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@design-system/ui'
import { useAuth } from '@providers/auth'

function UserProfileButton() {
	const { signOut } = useAuth()

	const handleLogout = () => {
		void signOut({
			callbackUrl: '/start'
		})
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button type="button" className="outline-none">
					<Icon
						name="UserFill"
						className="text-border-strong size-6"
					/>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuItem onClick={handleLogout}>
					로그아웃
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { UserProfileButton }
