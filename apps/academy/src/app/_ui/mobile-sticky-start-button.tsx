import { MobileBottomStickySection } from '@design-system/template'
import { Button } from '@design-system/ui'
import Link from 'next/link'

function MobileStickyStartButton() {
	return (
		<MobileBottomStickySection className="w-full border-t">
			<Button className="w-full" asChild size="lg">
				<Link href="/academy">빌리브 시작하기</Link>
			</Button>
		</MobileBottomStickySection>
	)
}

export { MobileStickyStartButton }
