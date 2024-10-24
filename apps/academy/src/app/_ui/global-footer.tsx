import { Logo } from '@design-system/template'
import { type HTMLProps } from 'react'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import Link from 'next/link'
import Image from 'next/image'
import kakaoLogo from '@/lib/asset/image/kakao.png'

export function GlobalFooter({
	className
}: {
	className?: HTMLProps<HTMLDivElement>['className']
}) {
	return (
		<footer className={cn('bg-secondary w-full', className)}>
			<section className="pc:px-[80px] pc:py-[60px] text-secondary-foreground grid grid-cols-1 px-4 py-[28px] text-sm">
				<div className="order-1 mb-6 flex justify-start">
					<Logo />
				</div>
				<hr className="order-3 my-4 border" />

				<div className="order-4 flex flex-col items-start">
					<div className="pc:flex-row flex w-full flex-col justify-between">
						<div className="flex flex-col gap-2">
							<div>
								<p>
									캑터스ㅣ대표 이창민ㅣ서울특별시 왕십리로 222
									코맥스스타트업타운 1층 유니콘룸
								</p>
								<p>
									사업자등록번호 143-51-00973ㅣ이메일 ceo@viliv.ai
								</p>
							</div>
							<div className="text-muted-foreground">
								VIdeo Lecture&apos;s Innovative Viewer, VILIV
							</div>
						</div>
						<div className="flex gap-2">
							<Link href="http://pf.kakao.com/_pIQxoG">
								<Image
									src={kakaoLogo}
									alt="kakaoLogo"
									className="h-10 w-10"
								/>
							</Link>
							<Link href="https://www.instagram.com/viliv_ai/">
								<Icon
									name="InstagramFill"
									className="text-muted-foreground"
									size={40}
								/>
							</Link>
						</div>
					</div>
				</div>
				<div />
			</section>
		</footer>
	)
}
