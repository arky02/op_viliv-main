import { Button } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import Link from 'next/link'

export function AcademyEmpty() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-10">
			<div className="text-muted-foreground flex flex-col items-center justify-center gap-6">
				<Icon
					name="GraduationCapFill"
					className="text-muted-foreground h-[60px] w-[60px]"
				/>
				<div className="flex flex-col items-center justify-center gap-1">
					<div>아직 생성된 학원이 없어요</div>
					<div>
						새 학원을 생성하려면 &apos;학원 생성하기&apos; 버튼을
						눌러 주세요
					</div>
				</div>
			</div>
			<Link href="/academy/create">
				<Button>학원 생성하기</Button>
			</Link>
		</div>
	)
}
