import { Icon } from '@design-system/icon'
import Link from 'next/link'
import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { userService } from '@/module/user/service'
import { MobileDetailHeader } from '../_ui/mobile-detail-header'
import { SearchArea } from './_ui/search-area'

export default async function SearchPage() {
	const userId = await authService.getMyUserIdOrThrow()
	if (!userId) redirect('/start')

	const userInfo = await userService.getMyUserInfo(userId)
	if (!userInfo) {
		return <div>세션 정보 로딩 실패</div>
	}

	return (
		<div>
			<div className="flex flex-col">
				<MobileDetailHeader title="학원 검색하기" />
				<div className="pc:bg-background pc:border-b max-pc:hidden flex items-center gap-3 px-[120px] py-6">
					<Link href="/academy">
						<Icon name="ArrowLeftLine" size={28} />
					</Link>
					<div className="text-xl font-semibold">
						학원 검색하기
					</div>
				</div>
				<SearchArea userInfo={userInfo} />
			</div>
		</div>
	)
}
