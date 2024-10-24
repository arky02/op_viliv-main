import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'
import Link from 'next/link'

interface LectureEmptyProps {
	params: {
		academyId: string
		classId: string
	}
}

export function LectureEmpty({
	params
}: LectureEmptyProps) {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-10">
			<div className="flex flex-col items-center justify-center gap-6">
				<Icon
					name="FolderCloseFill"
					className="text-muted-foreground h-[60px] w-[60px]"
				/>
				<div className="text-muted-foreground flex flex-col items-center justify-center gap-1">
					<div className="text-lg font-medium">
						아직 등록된 강의가 없어요
					</div>
					<div className="text-sm font-medium">
						새 강의를 생성하려면 &apos;강의 추가&apos; 버튼을 눌러
						주세요
					</div>
				</div>
			</div>
			<Link
				href={`/academy/${params.academyId}/student/${params.classId}/lecture/create`}
			>
				<Button>강의 추가</Button>
			</Link>
		</div>
	)
}
