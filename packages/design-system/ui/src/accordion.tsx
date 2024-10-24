'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<
		typeof AccordionPrimitive.Item
	>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		className={cn('border-border border-b', className)}
		ref={ref}
		{...props}
	/>
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<
		typeof AccordionPrimitive.Trigger
	>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			className={cn(
				'flex flex-1 items-center justify-between gap-4 py-4 text-left font-medium transition-all hover:underline data-[state=open]:pb-2 [&[data-state=open]>svg]:rotate-180',
				className
			)}
			ref={ref}
			{...props}
		>
			{children}
			<Icon
				name="ArrowDownSLine"
				className="size-4 transition-transform duration-200"
			/>
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
))
AccordionTrigger.displayName =
	AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<
		typeof AccordionPrimitive.Content
	>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		className={cn(
			'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-secondary-foreground overflow-hidden text-sm transition-all',
			className
		)}
		ref={ref}
		{...props}
	>
		<div className="pb-4">{children}</div>
	</AccordionPrimitive.Content>
))
AccordionContent.displayName =
	AccordionPrimitive.Content.displayName

export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
}
