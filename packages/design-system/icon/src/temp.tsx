import { VariantProps, cva } from 'class-variance-authority'
import * as s from '@heroicons/react/24/solid'
import * as o from '@heroicons/react/24/outline'
import { cn } from '@core/utils'

export interface IconProps
	extends React.SVGAttributes<SVGElement>,
		VariantProps<typeof iconVarients> {
	name: keyof typeof s | keyof typeof o
	solid?: boolean
}

const iconVarients = cva('shrink-0 text-inherit', {
	variants: {
		size: {
			sm: 'h-4 w-4',
			md: 'h-6 w-6',
			lg: 'h-8 w-8',
			xl: 'h-10 w-10'
		}
	},
	defaultVariants: {
		size: 'md'
	}
})

/**
 * 아이콘 컴포넌트입니다. heroicons을 사용하며, outline 버전과 solid 버전을 모두 지원합니다.
 * @param name 아이콘 이름
 * @param size 아이콘 크기 (기본값: md)
 * @see https://heroicons.com/
 */
function Icon({
	name,
	size,
	solid,
	className,
	...props
}: IconProps) {
	const HeroIcon = solid ? s[name] : o[name]
	return (
		<HeroIcon
			className={cn(
				iconVarients({
					size
				}),
				className
			)}
			{...props}
		/>
	)
}

export { Icon }
