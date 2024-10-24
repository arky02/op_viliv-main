import { Icon } from '@design-system/icon'
import Image from 'next/image'
import Link from 'next/link'
import { Badge, Separator } from '@design-system/ui'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { type GetClassInfo } from '@/module/academyClass/model'

interface PendingClassCardProps {
	group: GetClassInfo
}

interface JoinedClassCardProps {
	group: GetClassInfo
}

export function PendingClassCard({
	group
}: PendingClassCardProps) {
	return (
		<div className="bg-background flex flex-col gap-5 rounded-xl border p-6 shadow">
			<div className="flex justify-between">
				<Image
					src={group.academy.image || defaultImage}
					alt="img"
					className="h-[60px] w-[60px] rounded-lg border-4 object-cover"
					width={60}
					height={60}
				/>
				<Badge
					variant="secondary"
					className="text-primary h-fit rounded-sm bg-[#3C83F61A]"
				>
					수락 대기중
				</Badge>
			</div>
			<div className="flex justify-between gap-4">
				<div className="flex w-full flex-col gap-2">
					<div className="flex items-center gap-[10px]">
						<div className="text-muted-foreground text-lg font-semibold">
							{group.academy.name}
						</div>
						<Separator
							orientation="vertical"
							className="border-border-strong h-4"
						/>
						<div className="text-muted-foreground text-lg font-semibold">
							{group.name}
						</div>
					</div>
					<div className="flex justify-between">
						<div className="text-muted-foreground text-sm font-medium">
							<div>
								{group.academy.academyMembers[0]?.user?.name}
							</div>
							<div>
								{`${group.academy.address} ${group.academy.addressDetail}`}
							</div>
						</div>
						<div className="bg-secondary flex items-center justify-center gap-2 rounded-lg p-4">
							<Icon
								name="UserFill"
								className="text-muted-foreground h-5 w-5"
							/>
							<div className="text-secondary-foreground text-base font-medium">
								{group._count.students}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export function JoinedClassCard({
	group
}: JoinedClassCardProps) {
	return (
		<Link href={`/academy/${group.id}`}>
			<div className="bg-background flex flex-col gap-5 rounded-xl border p-6 shadow">
				<Image
					src={group.academy.image || defaultImage}
					alt="img"
					className="h-[60px] w-[60px] rounded-lg border-4 object-cover"
					width={60}
					height={60}
				/>
				<div className="flex justify-between gap-4">
					<div className="flex w-full flex-col gap-2">
						<div className="flex items-center gap-[10px]">
							<div className="text-lg font-semibold">
								{group.academy.name}
							</div>
							<Separator
								orientation="vertical"
								className="border-border-strong h-4"
							/>
							<div className="text-lg font-semibold">
								{group.name}
							</div>
						</div>
						<div className="flex justify-between">
							<div className="text-secondary-foreground text-sm font-medium">
								<div>
									{group.academy.academyMembers[0]?.user?.name}
								</div>
								<div>
									{`${group.academy.address} ${group.academy.addressDetail}`}
								</div>
							</div>
							<div className="bg-secondary flex items-center justify-center gap-2 rounded-lg p-4">
								<Icon
									name="UserFill"
									className="text-muted-foreground h-5 w-5"
								/>
								<div className="text-secondary-foreground text-base font-medium">
									{group._count.students}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
