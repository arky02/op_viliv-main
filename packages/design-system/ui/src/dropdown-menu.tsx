'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { optionItemClass } from './constants'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup =
	DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.SubTrigger
	> & {
		inset?: boolean
	}
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		className={cn(
			optionItemClass,
			'data-[state=open]:bg-hover',
			inset && 'pl-8',
			className
		)}
		ref={ref}
		{...props}
	>
		{children}
		<Icon name="ArrowRightSLine" className="ml-auto size-4" />
	</DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
	DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.SubContent
	>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.SubContent
		className={cn(
			'bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-strong z-50 min-w-[8rem] overflow-hidden rounded-md border p-2 shadow-lg',
			className
		)}
		ref={ref}
		{...props}
	/>
))
DropdownMenuSubContent.displayName =
	DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.Content
	>
>(({ className, sideOffset = 8, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			className={cn(
				'bg-background text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-strong z-50 min-w-[8rem] overflow-hidden rounded-md border p-2 shadow-lg',
				className
			)}
			ref={ref}
			sideOffset={sideOffset}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName =
	DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.Item
	> & {
		inset?: boolean
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		className={cn(
			optionItemClass,
			inset && 'pl-8',
			className
		)}
		ref={ref}
		{...props}
	/>
))
DropdownMenuItem.displayName =
	DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
	React.ElementRef<
		typeof DropdownMenuPrimitive.CheckboxItem
	>,
	React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.CheckboxItem
	>
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		checked={checked}
		className={cn(optionItemClass, className)}
		ref={ref}
		{...props}
	>
		<DropdownMenuPrimitive.ItemIndicator>
			<Icon
				name="CheckLine"
				className="text-foreground size-4"
			/>
		</DropdownMenuPrimitive.ItemIndicator>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
	DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.RadioItem
	>
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		className={cn(optionItemClass, className)}
		ref={ref}
		{...props}
	>
		<DropdownMenuPrimitive.ItemIndicator>
			<div className="bg-foreground h-2 w-2 rounded-full" />
		</DropdownMenuPrimitive.ItemIndicator>
		{children}
	</DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName =
	DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.Label
	> & {
		inset?: boolean
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		className={cn(
			'p-2 text-sm font-bold',
			inset && 'pl-8',
			className
		)}
		ref={ref}
		{...props}
	/>
))
DropdownMenuLabel.displayName =
	DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<
		typeof DropdownMenuPrimitive.Separator
	>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		className={cn('bg-border -mx-2 my-2 h-px', className)}
		ref={ref}
		{...props}
	/>
))
DropdownMenuSeparator.displayName =
	DropdownMenuPrimitive.Separator.displayName

function DropdownMenuShortcut({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				'ml-auto text-xs tracking-widest opacity-60',
				className
			)}
			{...props}
		/>
	)
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup
}
