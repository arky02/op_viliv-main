import { Icon } from '@design-system/icon'
import Image from 'next/image'
import { type GetAcademies } from '@/module/academy/model'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { type GetMyUserInfo } from '@/module/user/model'
import { InviteMemberModal } from './academy-invite-modal'

interface AcademySearchCardProps {
	academy: GetAcademies
	userInfo: GetMyUserInfo
}

export function AcademySearchCard({
	academy,
	userInfo
}: AcademySearchCardProps) {
	return (
		<div className="bg-background flex flex-col gap-5 rounded-xl border p-6 shadow">
			<div className="flex justify-between">
				<Image
					src={academy.image || defaultImage}
					alt="img"
					className="h-[60px] w-[60px] rounded-lg border-4 object-cover"
					width={60}
					height={60}
				/>
				<InviteMemberModal
					academy={academy}
					userInfo={userInfo}
				/>
			</div>
			<div className="flex justify-between gap-4">
				<div className="flex w-full flex-col gap-2">
					<div className="text-lg font-semibold">
						{academy.name}
					</div>
					<div className="flex justify-between">
						<div className="text-secondary-foreground text-sm font-medium">
							<div>{academy.academyMembers[0]?.user?.name}</div>
							<div>
								{`${academy.address} ${academy.addressDetail}`}
							</div>
						</div>
						<div className="bg-secondary flex items-center justify-center gap-2 rounded-lg p-4">
							<Icon
								name="UserFill"
								className="text-muted-foreground h-5 w-5"
							/>
							<div className="text-secondary-foreground text-base font-medium">
								{academy.academyClasses.length}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
