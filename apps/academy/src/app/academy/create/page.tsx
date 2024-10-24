import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { MobileDetailHeader } from '@/app/_ui/mobile-detail-header'
import { userService } from '@/module/user/service'
import { AcademyCreateForm } from '../_ui/academy-create-form'

export default async function AcademyCreatePage() {
	const session = await authService.getMySession()
	if (!session) redirect('/start')

	const phoneNumber =
		await userService.getPhoneNumberByUserId(session.user.id)

	return (
		<div className="bg-background h-screen">
			<MobileDetailHeader title="학원 생성하기" />
			<AcademyCreateForm phoneNumber={phoneNumber} />
		</div>
	)
}
