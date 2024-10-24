import { Icon } from '@design-system/icon'
import { type GetClasses } from '@/module/academyClass/model'

interface ClassCardProps {
	group: GetClasses
}

export function ClassCard({ group }: ClassCardProps) {
	return (
		<div className="bg-background flex justify-between gap-6 rounded-xl border p-6 shadow">
			<div className="flex flex-col gap-1">
				<div className="text-xl font-semibold">
					{group.name}
				</div>
				<div className="text-secondary-foreground text-base font-medium">
					{group.academyMembers.length > 0 ? (
						<>
							{group.academyMembers[0]?.user?.name}
							{group._count.academyMembers > 1 && (
								<> 외 {group._count.academyMembers - 1}명</>
							)}
						</>
					) : (
						'지정된 강사가 없습니다'
					)}
				</div>
			</div>
			<div className="bg-secondary flex h-fit gap-2 rounded-lg p-4">
				<Icon
					name="LiveFill"
					className="text-muted-foreground"
				/>
				<div className="text-secondary-foreground text-base font-medium">
					{group._count.lectures}
				</div>
			</div>
		</div>
	)
}
