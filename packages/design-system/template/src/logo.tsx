import Image from 'next/image'
import Link from 'next/link'

/**
 * 로고를 표시합니다. 주로 메인 페이지로 이동하는 링크로 사용됩니다.
 * 로고 이미지는 /public/logo.svg에 있습니다.
 * <br/> @param href 링크할 주소
 */
export function Logo({ href = '/' }: { href?: string }) {
	return (
		<Link href={href}>
			<Image
				src="/logo.svg"
				alt="logo"
				width={200}
				height={20}
				className="h-5 w-full"
				priority
			/>
		</Link>
	)
}
Logo.displayName = 'Logo'
