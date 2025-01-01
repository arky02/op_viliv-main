'use client'

import { Icon } from '@design-system/icon'
import Image from 'next/image'
import { Badge, Separator } from '@design-system/ui'
import { useDialogStore } from '@core/react/zustand/dialog-store'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { type GetClassInfo } from '@/module/academyClass/model'
import { DeviceControlModal } from './device-control-modal'

interface PendingClassCardProps {
	group: GetClassInfo
}

interface JoinedClassCardProps {
	group: GetClassInfo
	device: { mobile: string; tablet: string; pc: string }
	deviceChangeReason: string
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
	group,
	device,
	deviceChangeReason
}: JoinedClassCardProps) {
	const { toggleDialog } = useDialogStore()

	const router = useRouter()

	const [selectedAcademyId, setSelectedAcademyId] = useState<
		string | null
	>(null)

	const verifyAcademyAccess = (academyId: string) => {
		if (!group.academy.device_constraint_enabled)
			router.push(`/academy/${academyId}`)
		else {
			setSelectedAcademyId(academyId)
			toggleDialog('isDeviceControlModalOpened')
		}
	}
	return (
		<div>
			<div
				className="bg-background flex flex-col gap-5 rounded-xl border p-6 shadow"
				onClick={() => verifyAcademyAccess(group.id)}
			>
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
			{selectedAcademyId ? (
				<DeviceControlModal
					academyId={group.id}
					device={device}
					deviceChangeReason={deviceChangeReason}
					selectedAcademyId={selectedAcademyId}
				/>
			) : null}
		</div>
	)
}
