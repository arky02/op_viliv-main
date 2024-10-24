'use client'

import { cn } from '@core/utils'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as React from 'react'

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<
		typeof RadioGroupPrimitive.Root
	>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Root
			className={cn('grid gap-4', className)}
			{...props}
			ref={ref}
		/>
	)
})
RadioGroup.displayName =
	RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<
		typeof RadioGroupPrimitive.Item
	>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			className={cn(
				'bg-background border-strong aria-checked:border-primary h-4 w-4 rounded-full border disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<div className="bg-primary h-2 w-2 rounded-full" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	)
})
RadioGroupItem.displayName =
	RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
