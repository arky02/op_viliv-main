import * as React from 'react'
import { cn } from '@core/utils'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Icon } from '@design-system/icon'

export const inputVariants = cva(
	'bg-background placeholder:text-muted-foreground text-foreground focus:ring-primary disabled:bg-muted disabled:text-muted-foreground ring-border-strong w-full rounded-md shadow-sm outline-none ring-1 ring-inset focus:ring-2 disabled:shadow-none disabled:ring-0',
	{
		variants: {
			size: {
				default: 'px-4 py-3',
				sm: 'px-3 py-2 text-sm'
			}
		},
		defaultVariants: {
			size: 'default'
		}
	}
)
export interface InputProps
	extends Omit<
			React.InputHTMLAttributes<HTMLInputElement>,
			'size'
		>,
		VariantProps<typeof inputVariants> {}
const Input = React.forwardRef<
	HTMLInputElement,
	InputProps
>(({ className, size, ...props }, ref) => {
	return (
		<input
			className={cn(
				inputVariants({
					size
				}),
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Input.displayName = 'Input'

const inputHintTextVariants = cva(
	'flex items-center gap-1 text-sm',
	{
		variants: {
			type: {
				default: 'text-secondary-foreground',
				destructive: 'text-destructive'
			}
		},
		defaultVariants: {
			type: 'default'
		}
	}
)
export interface InputHintTextProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof inputHintTextVariants> {}
const InputHintText = React.forwardRef<
	HTMLDivElement,
	InputHintTextProps
>(({ className, children, type, ...props }, ref) => {
	return (
		<div
			className={cn(
				inputHintTextVariants({ type }),
				className
			)}
			ref={ref}
			{...props}
		>
			<Icon name="ErrorWarningLine" className="size-4" />
			<p>{children}</p>
		</div>
	)
})
InputHintText.displayName = 'InputHintText'

export { Input, InputHintText }
