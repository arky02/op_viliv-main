import * as RemixIcons from '@remixicon/react'
import { cn } from '@core/utils'
import { SVGProps } from 'react'

type AllSVGProps = SVGProps<SVGSVGElement>
type ReservedProps =
	| 'color'
	| 'size'
	| 'width'
	| 'height'
	| 'fill'
	| 'viewBox'
interface RemixiconProps
	extends Pick<
		AllSVGProps,
		Exclude<keyof AllSVGProps, ReservedProps>
	> {
	color?: string
	size?: number | string
	children?: never
}

type RemixIconsType = keyof typeof RemixIcons
type BaseIconNames =
	RemixIconsType extends `Ri${infer Base}` ? Base : never

export interface IconProps extends RemixiconProps {
	name: BaseIconNames
}

/**
 * 아이콘 컴포넌트입니다. Remix-icon을 사용하며, outline 버전과 solid 버전을 모두 지원합니다.
 * @param name 아이콘 이름
 * @param size? 아이콘 크기 (기본값: 24)
 * @see https://remixicon.com/
 */
function Icon({ name, className, ...props }: IconProps) {
	const iconName = `Ri${name}` as RemixIconsType
	const RemixIcon = RemixIcons[iconName]

	return (
		<RemixIcon
			className={cn('shrink-0', className)}
			{...props}
		/>
	)
}

export { Icon }
