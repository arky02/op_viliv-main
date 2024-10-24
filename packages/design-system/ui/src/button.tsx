import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import {
	cva,
	type VariantProps
} from 'class-variance-authority'
import { cn } from '@core/utils'

const buttonVariants = cva(
	'disabled:bg-muted disabled:text-muted-foreground inline-flex items-center justify-center rounded-md transition-all disabled:pointer-events-none disabled:!border-none',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-md',
				secondary:
					'bg-secondary text-foreground hover:bg-secondary-hover hover:shadow-md',
				outline:
					'border-strong text-foreground bg-background hover:bg-secondary-hover border hover:shadow-md',
				ghost: 'text-foreground hover:bg-secondary-hover',
				link: 'text-foreground hover:underline',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
				loading:
					'bg-secondary-foreground text-primary-foreground pointer-events-none'
			},
			size: {
				sm: 'px-4 py-2 text-sm font-medium',
				default: 'px-6 py-3 text-base font-semibold',
				lg: 'px-6 py-4 text-xl font-bold'
			},
			options: {
				icon: '!p-0'
			}
		},
		compoundVariants: [
			{
				options: 'icon',
				size: 'sm',
				class: 'h-9 w-9'
			},
			{
				options: 'icon',
				size: 'default',
				class: 'h-12 w-12'
			},
			{
				options: 'icon',
				size: 'lg',
				class: 'h-[60px] w-[60px]'
			}
		],
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	leftElement?: React.ReactNode
	rightElement?: React.ReactNode
}

const Button = React.forwardRef<
	HTMLButtonElement,
	ButtonProps
>(
	(
		{
			className,
			variant,
			size,
			options,
			asChild = false,
			disabled,
			children,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'
		const InternalButton = asChild ? Slot : 'span'
		return (
			<Comp
				className={cn(
					buttonVariants({
						variant,
						size,
						options,
						className
					})
				)}
				ref={ref}
				disabled={variant === 'loading' || disabled}
				{...props}
			>
				<InternalButton className="px-3">
					{children}
				</InternalButton>
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
