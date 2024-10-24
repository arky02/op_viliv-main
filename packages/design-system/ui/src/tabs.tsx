'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@core/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<
		typeof TabsPrimitive.List
	> & {
		type?: 'default' | 'fill'
	}
>(({ className, type = 'default', ...props }, ref) => (
	<div className="flex items-end overflow-scroll">
		<TabsPrimitive.List
			className={cn(
				'peer grid grid-flow-col data-[type=fill]:w-full',
				className
			)}
			ref={ref}
			{...props}
			data-type={type}
		/>
		<div className="bg-border h-px flex-1 peer-data-[type=fill]:hidden" />
	</div>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<
		typeof TabsPrimitive.Trigger
	>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		className={cn(
			'data-[state=active]:border-primary data-[state=active]:text-primary border-muted-foreground text-muted-foreground inline-flex w-full items-center justify-center gap-1 whitespace-nowrap border-b px-4 py-2 font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:pb-[7px]',
			className
		)}
		ref={ref}
		{...props}
	/>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<
		typeof TabsPrimitive.Content
	>
>((props, ref) => (
	<TabsPrimitive.Content ref={ref} {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
