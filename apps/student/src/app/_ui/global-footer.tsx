import { Logo } from '@design-system/template'
import { type HTMLProps } from 'react'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'

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
						<div>
							<p>
								빌리브ㅣ대표 OOOㅣ경기도 성남시 분당구 대왕판교로
								645번길 12 경기창조경제혁신센터 8층 R18 |
							</p>
							<p>
								통신판매업번호 2023-성남분당A-1062 | 이메일
								ashbrother@devgate.com | 연락처 010-1111-2222
							</p>
						</div>
						<Icon
							name="InstagramFill"
							className="text-muted-foreground"
						/>
					</div>
				</div>
				<div />
			</section>
		</footer>
	)
}
