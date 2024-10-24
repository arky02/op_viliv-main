import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { Icon } from '@design-system/icon'
import Link from 'next/link'
import { userService } from '@/module/user/service'
import { MobileDetailHeader } from '../_ui/mobile-detail-header'
import { GlobalHeader } from '../_ui/global-header'
import { UserInfo } from './ui/user-info'

export default async function MyPage() {
	const userId = await authService.getMyUserIdOrThrow()
	if (!userId) redirect('/start')

	const userInfo = await userService.getMyUserInfo(userId)
	if (!userInfo) {
		return <div>세션 정보 로딩 실패</div>
	}

	return (
		<div>
			<div className="max-pc:hidden">
				<GlobalHeader />
			</div>
			<div className="flex flex-col items-center">
				<MobileDetailHeader title="내 정보" />
				<div className="flex flex-col">
					<div className="max-pc:hidden pc:mt-10 pc:ml-8 flex gap-2">
						<Link href="/" className="hover:cursor-pointer">
							<Icon name="ArrowLeftLine" size={32} />
						</Link>
						<div className="text-2xl font-semibold">내 정보</div>
					</div>
					<div className="max-pc:m-4">
						<UserInfo userInfo={userInfo} />
					</div>
				</div>
			</div>
		</div>
	)
}
