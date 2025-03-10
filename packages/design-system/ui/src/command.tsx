'use client'

import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import type { DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'
import { optionItemClass } from './constants'
import { Dialog, DialogContent } from './dialog'

/**
 * 검색기능과 단축키를 제공하는 컴포넌트입니다.
 * 콤보박스와 유사하게 사용할 수 있습니다.
 */
const Command = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
	<CommandPrimitive
		className={cn(
			'bg-background text-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
			className
		)}
		ref={ref}
		{...props}
	/>
))
Command.displayName = CommandPrimitive.displayName

type CommandDialogProps = DialogProps

function CommandDialog({
	children,
	...props
}: CommandDialogProps) {
	return (
		<Dialog {...props}>
			<DialogContent className="overflow-hidden p-0 shadow-lg">
				<Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	)
}

const CommandInput = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Input>,
	React.ComponentPropsWithoutRef<
		typeof CommandPrimitive.Input
	>
>(({ className, ...props }, ref) => (
	<div className="flex items-center gap-2 border-b px-4">
		<Icon
			name="SearchLine"
			className="text-secondary-foreground size-4"
		/>
		<CommandPrimitive.Input
			className={cn(
				'placeholder:text-muted-foreground text-foreground flex w-full rounded-md bg-transparent py-3 text-sm font-medium outline-none',
				className
			)}
			ref={ref}
			{...props}
		/>
	</div>
))

CommandInput.displayName =
	CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.List>,
	React.ComponentPropsWithoutRef<
		typeof CommandPrimitive.List
	>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.List
		className={cn(
			'max-h-[300px] overflow-y-auto overflow-x-hidden',
			className
		)}
		ref={ref}
		{...props}
	/>
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Empty>,
	React.ComponentPropsWithoutRef<
		typeof CommandPrimitive.Empty
	>
>((props, ref) => (
	<CommandPrimitive.Empty
		className="py-4 text-center text-sm font-medium"
		ref={ref}
		{...props}
	/>
))

CommandEmpty.displayName =
	CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Group>,
	React.ComponentPropsWithoutRef<
		typeof CommandPrimitive.Group
	>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Group
		className={cn(
			'text-foreground [&_[cmdk-group-heading]]:text-secondary-foreground overflow-hidden p-2 [&_[cmdk-group-heading]]:p-2 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium',
			className
		)}
		ref={ref}
		{...props}
	/>
))

CommandGroup.displayName =
	CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Separator>,
	React.ComponentPropsWithoutRef<
		typeof CommandPrimitive.Separator
	>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Separator
		className={cn('bg-border -mx-1 h-px', className)}
		ref={ref}
		{...props}
	/>
))
CommandSeparator.displayName =
	CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
	React.ElementRef<typeof CommandPrimitive.Item>,
	React.ComponentPropsWithoutRef<
		typeof CommandPrimitive.Item
	>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Item
		className={cn(optionItemClass, className)}
		ref={ref}
		{...props}
	/>
))

CommandItem.displayName = CommandPrimitive.Item.displayName

function CommandShortcut({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				'text-muted-foreground ml-auto text-xs tracking-widest',
				className
			)}
			{...props}
		/>
	)
}
CommandShortcut.displayName = 'CommandShortcut'

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
}
