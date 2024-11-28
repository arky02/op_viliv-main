import { Button } from '@design-system/ui'
import Link from 'next/link'
import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { userService } from '@/module/user/service'
import { academyService } from '@/module/academy/service'
import { GlobalHeader } from '../_ui/global-header'
import { AcademyCard } from './_ui/academy-card'
import { AcademyEmpty } from './_ui/academy-empty'

export default async function AcademyPage() {
	const session = await authService.getMySession()
	if (!session) redirect('/start')

	const phoneNumber =
		await userService.getPhoneNumberByUserId(session.user.id)
	if (!phoneNumber) {
		redirect('/error')
	}

	const academies =
		await academyService.getAcademiesList(phoneNumber)

	const userId = session.user.id

	const isSignedIn = !!session

	return (
		<div>
			<GlobalHeader isSignedIn={isSignedIn} />
			<section>
				<div className="flex flex-col">
					<div className="pc:pt-10 pc:pb-6 flex items-center justify-between p-4">
						<div className="text-2xl font-semibold">기관</div>
						<Button asChild size="sm" className="h-fit">
							<Link href="/academy/create">기관 생성하기</Link>
						</Button>
					</div>
					{academies.length > 0 ? (
						<div className="pc:grid-cols-2 pc:gap-4 grid grid-cols-1 gap-3 px-4">
							{academies.map((academy) => (
								<AcademyCard
									key={academy.id}
									academy={academy}
									userId={userId}
								/>
							))}
						</div>
					) : (
						<AcademyEmpty />
					)}
				</div>
			</section>
		</div>
	)
}
