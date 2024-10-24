import {
	Header,
	HeaderActions,
	HeaderLeading,
	Logo
} from '@design-system/template'
import Link from 'next/link'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'

export function GlobalHeader({
	disableMobile
}: {
	disableMobile?: boolean
}) {
	return (
		<>
			<Header className="max-pc:hidden pc:py-2 w-full border border-b">
				<HeaderLeading>
					<Logo />
				</HeaderLeading>
				<HeaderActions>
					<Link href="/">
						<Icon
							name="UserFill"
							className="text-border-strong"
						/>
					</Link>
				</HeaderActions>
			</Header>
			<Header
				className={cn(
					'pc:hidden block',
					disableMobile && 'hidden'
				)}
			>
				<HeaderLeading>
					<Logo />
				</HeaderLeading>
				<HeaderActions>
					<Link href="/">
						<Icon
							name="UserFill"
							className="text-border-strong"
						/>
					</Link>
				</HeaderActions>
			</Header>
		</>
	)
}
