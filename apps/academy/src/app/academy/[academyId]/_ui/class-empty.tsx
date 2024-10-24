import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'
import Link from 'next/link'

export function ClassEmpty({
	paramsId
}: {
	paramsId: string
}) {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-10">
			<div className="flex flex-col items-center justify-center gap-6">
				<Icon
					name="Apps2AddFill"
					className="text-muted-foreground h-[60px] w-[60px]"
				/>
				<div className="text-muted-foreground flex flex-col items-center justify-center gap-1">
					<div className="text-lg font-medium">
						아직 생성된 그룹이 없어요
					</div>
					<div className="text-sm font-medium">
						새 그룹을 생성하려면 &apos;그룹 생성하기&apos; 버튼을
						눌러 주세요
					</div>
				</div>
			</div>
			<Link href={`/academy/${paramsId}/student/create`}>
				<Button>그룹 생성하기</Button>
			</Link>
		</div>
	)
}
