import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import Script from 'next/script'
import { academyService } from '@/module/academy/service'
import { MobileMenuHeader } from '@/app/_ui/mobile-menu-header'
import { getMyDataAction } from '@/module/user/action'
import { academyMemberService } from '@/module/academyMember/service'
import { userService } from '@/module/user/service'
import { paymentService } from '@/module/payment/service'
import { PlanInfo } from './_ui/plan-info'

interface AcademyMemberPageProps {
	params: {
		academyId: string
	}
}

export default async function AcademyPlanPage({
	params
}: AcademyMemberPageProps) {
	const userId = await authService.getMyUserIdOrThrow()
	if (!userId) redirect('/start')

	const academyInfo = await academyService.getAcademyInfo(
		params.academyId
	)

	const userInfo = await userService.getMyUserInfo(userId)
	if (!userInfo) {
		return <div>세션 정보 로딩 실패</div>
	}
	const myData = await getMyDataAction(userId)

	const academyMemberInfo =
		await academyMemberService.getMyAcademyMemberInfo({
			academyId: params.academyId,
			phoneNumber: myData.phoneNumber
		})

	const memberRole = academyMemberInfo?.role
	if (!memberRole) {
		return (
			<div className="flex">
				<div>회원 역할 로딩 실패</div>
			</div>
		)
	}

	const cardInfo =
		await paymentService.getPaymentCardByAcademyId(
			params.academyId
		)
	const cardNumber = cardInfo?.cardNumber

	const paymentInfo =
		await paymentService.getPaymentsByAcademyId(
			params.academyId
		)

	return (
		<div className="flex flex-col">
			{/* For Payple Init */}
			<Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" />
			<Script src="https://democpay.payple.kr/js/v1/payment.js" />
			<MobileMenuHeader
				title={academyInfo.name}
				academyInfo={academyInfo}
				userInfo={userInfo}
				memberRole={memberRole}
			/>
			<div className="pc:bg-background pc:border-b pc:py-6 flex items-center justify-between px-8 pt-6">
				<div className="text-xl font-semibold">구독 관리</div>
			</div>
			<div className="m-4">
				<PlanInfo
					academyInfo={academyInfo}
					params={params}
					cardNumber={cardNumber}
					paymentInfo={paymentInfo}
				/>
			</div>
		</div>
	)
}
