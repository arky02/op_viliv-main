import {
	Header,
	HeaderActions,
	HeaderLeading,
	Logo
} from '@design-system/template'
import Link from 'next/link'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'
import { UserProfileButton } from './user-profile-button'

interface GlobalHeaderProps {
	isSignedIn: boolean
	disableMobile?: boolean
}

export function GlobalHeader({
	isSignedIn,
	disableMobile
}: GlobalHeaderProps) {
	return (
		<Header
			className={cn(
				'pc:py-2 pc:w-full pc:border pc:border-b',
				disableMobile && 'max-pc:hidden'
			)}
		>
			<HeaderLeading>
				<Logo />
			</HeaderLeading>
			<HeaderActions>
				{isSignedIn ? (
					<UserProfileButton />
				) : (
					<Link href="/start">
						<Button size="sm">시작하기</Button>
					</Link>
				)}
			</HeaderActions>
		</Header>
	)
}
