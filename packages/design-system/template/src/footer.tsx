import { cn } from '@core/utils'
import Link from 'next/link'
import React from 'react'
import { Logo } from './logo'

/**
 * 페이지 하단에서 사용되는 푸터입니다.
 * `Footer` 내부에 다음과 같은 영역으로 구성할 수 있습니다.
 * - `FooterInfo` : 로고 하단(데스크탑)/최하단(모바일)에 위치하는 영역입니다.
 * - `FooterMenu`: 오른쪽(데스크탑)/중앙(모바일)에 위치하는 영역입니다. 푸터 링크를 표시합니다.
 * - `FooterDescription`: 회사명, 사업자등록번호 등 회사 정보를 표시할 때 사용합니다.
 *
 * @example
 * ```tsx
 * <Footer>
 *   <FooterInfo>
 *     <FooterDescription data={[{label: '사업자등록번호', value: '000-00-00000'}]} />
 *   </FooterInfo>
 *   <FooterMenu data={[{label:"More", links: [{title: "About", link: "/about"}, {title: "Contact", link: "/contact"}]}]} />
 * </Footer>
 * ```
 */
function Footer({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<footer className="bg-secondary w-full">
			<section
				className={cn(
					'pc:px-10 max-pc:flex-col pc:py-20 pc:grid-cols-[auto_1fr] pc:gap-x-20 pc:gap-y-8 grid grid-cols-1 gap-10 px-4 py-[60px]',
					className
				)}
				{...props}
			>
				<div className="order-1 flex justify-start">
					<Logo />
				</div>
				{children}
			</section>
		</footer>
	)
}
Footer.displayName = 'Footer'

function FooterInfo({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'order-3 flex flex-col items-start',
				className
			)}
			{...props}
		/>
	)
}
FooterInfo.displayName = 'FooterInfo'

function FooterDescription({
	className,
	data,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	data: {
		label: string
		value: string
	}[]
}) {
	return (
		<div
			className={cn('flex flex-col gap-2', className)}
			{...props}
		>
			{data.map((v, i) => (
				<FooterValue key={i} {...v} />
			))}
		</div>
	)
}
FooterDescription.displayName = 'FooterDescription'

function FooterValue({
	className,
	label,
	value,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	label: string
	value: string
}) {
	return (
		<div
			className={cn(
				'flex items-center gap-2 text-sm font-medium',
				className
			)}
			{...props}
		>
			<div className="text-secondary-foreground">{label}</div>
			<div className="text-foreground">{value}</div>
		</div>
	)
}

function FooterMenu({
	data,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	data: {
		label: string
		links: {
			title: string
			link: string
		}[]
	}[]
}) {
	return (
		<div
			className={cn(
				'pc:px-10 pc:flex-row pc:gap-20 pc:row-span-2 order-2 flex flex-1 flex-col justify-end gap-8 px-0',
				className
			)}
			{...props}
		>
			{data.map(({ label, links }, idx) => (
				<div key={label + idx} className="flex flex-col gap-4">
					<div className="text-lg font-semibold">{label}</div>
					<div className="pc:flex-col pc:gap-3 flex gap-6">
						{links.map((link, idx) => (
							<FooterLink key={link.title + idx} {...link} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
FooterMenu.displayName = 'FooterMenu'

function FooterLink({
	title,
	link,
	className,
	...props
}: React.HTMLAttributes<HTMLAnchorElement> & {
	title: string
	link: string
}) {
	return (
		<Link
			href={link}
			className={cn('text-secondary-foreground', className)}
			{...props}
		>
			{title}
		</Link>
	)
}

export { Footer, FooterDescription, FooterInfo, FooterMenu }
