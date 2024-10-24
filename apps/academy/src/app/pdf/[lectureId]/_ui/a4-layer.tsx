import { cn } from '@core/utils'

interface A4LayerProps {
	children: React.ReactNode
	className?: string
}

export function A4Layer({
	children,
	className
}: A4LayerProps) {
	return (
		<div
			style={{ pageBreakAfter: 'always' }}
			className={cn(
				'flex flex-col items-center justify-between overflow-visible px-[120px]',
				className
			)}
		>
			{children}
		</div>
	)
}
