import { Button } from '@design-system/ui'
import Link from 'next/link'
import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { userService } from '@/module/user/service'
import { academyClassService } from '@/module/academyClass/service'
import { GlobalHeader } from '../_ui/global-header'
import { AcademyEmpty } from './_ui/academy-empty'
import {
	JoinedClassCard,
	PendingClassCard
} from './_ui/class-card'

export default async function AcademyPage() {
	const session = await authService.getMySession()
	if (!session) redirect('/start')

	const phoneNumber =
		await userService.getPhoneNumberByUserId(session.user.id)

	if (!phoneNumber) {
		redirect('/error')
	}

	const pendingClasses =
		await academyClassService.getMyPendingClasses(
			session.user.id
		)

	const joinedClasses =
		await academyClassService.getMyJoinedClasses(
			session.user.id
		)

	return (
		<div>
			<GlobalHeader />
			<section>
				<div className="flex flex-col">
					<div className="pc:pt-10 pc:pb-6 flex items-center justify-between p-4">
						<div className="text-2xl font-semibold">학원</div>
						<Link href="/search">
							<Button size="sm" className="h-fit">
								학원 추가하기
							</Button>
						</Link>
					</div>
					{pendingClasses.length > 0 ||
					joinedClasses.length > 0 ? (
						<div className="pc:grid-cols-2 pc:gap-4 grid grid-cols-1 gap-3 px-4">
							{pendingClasses.map((group) => (
								<PendingClassCard key={group.id} group={group} />
							))}
							{joinedClasses.map((group) => (
								<JoinedClassCard key={group.id} group={group} />
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
