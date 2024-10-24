import { Icon } from '@design-system/icon'
import Image from 'next/image'
import Link from 'next/link'
import { type GetAcademies } from '@/module/academy/model'
import defaultImage from '@/lib/asset/image/square-default-image.png'

interface AcademyModalCardProps {
	academy: GetAcademies
}

export function AcademyModalCard({
	academy
}: AcademyModalCardProps) {
	return (
		<Link href={`/academy/${academy.id}/student`}>
			<div className="bg-secondary flex flex-col gap-5 rounded-xl border p-6">
				<Image
					src={academy.image || defaultImage}
					alt="img"
					className="h-[60px] w-[60px] rounded-lg border-4 object-cover"
					width={60}
					height={60}
				/>
				<div className="flex justify-between gap-4">
					<div className="flex w-full flex-col gap-2">
						<div className="text-lg font-semibold">
							{academy.name}
						</div>
						<div className="flex justify-between">
							<div className="flex flex-col gap-[2px] text-sm font-semibold">
								<div>{academy.academyMembers[0]?.user?.name}</div>
								<div className="text-secondary-foreground font-medium">
									{`${academy.address} ${academy.addressDetail}`}
								</div>
							</div>
							<div className="bg-background flex items-center justify-center gap-2 rounded-lg p-4">
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
		</Link>
	)
}
