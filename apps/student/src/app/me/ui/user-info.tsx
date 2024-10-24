import { formatPhoneNumber } from '@core/utils'
import { type GetMyUserInfo } from '@/module/user/model'
import { LogOutButton } from './logout-button'
import { UserImageArea } from './user-image-area'
import { UserNameArea } from './user-name-area'

interface UserInfoProps {
	userInfo: GetMyUserInfo
}

export function UserInfo({ userInfo }: UserInfoProps) {
	return (
		<div className="pc:w-[768px] pc:ml-8 pc:mt-8 flex flex-col gap-4">
			<div className="pc:p-4 bg-background flex flex-col rounded-xl border p-3 shadow">
				<div className="border-border-strong overflow-hidden rounded-lg border">
					<div className="bg-secondary border-b p-6 text-base font-semibold">
						이미지
					</div>
					<div className="p-6">
						<UserImageArea userInfo={userInfo} />
					</div>
				</div>
			</div>
			<div className="pc:p-4 bg-background flex flex-col rounded-xl border p-3 shadow">
				<div className="border-border-strong overflow-hidden rounded-lg border">
					<div className="bg-secondary flex flex-col gap-1 border-b p-6">
						<div className="font-semibold">이름</div>
						<div className="text-secondary-foreground text-sm font-medium">
							서비스에서 사용할 닉네임을 적어주세요
						</div>
					</div>
					<div className="p-6">
						<UserNameArea userInfo={userInfo} />
					</div>
				</div>
			</div>
			<div className="pc:p-4 bg-background pc:gap-4 flex flex-col gap-3 rounded-xl border p-3 shadow">
				<div className="border-border-strong overflow-hidden rounded-lg border">
					<div className="bg-secondary flex flex-col gap-1 border-b p-6">
						<div className="font-semibold">휴대폰 번호</div>
						<div className="text-secondary-foreground text-sm font-medium">
							서비스에서 사용할 휴대폰 번호를 적어주세요
						</div>
					</div>
					<div className="p-6">
						<div>{formatPhoneNumber(userInfo.phoneNumber)}</div>
					</div>
				</div>
			</div>
			<LogOutButton />
		</div>
	)
}
