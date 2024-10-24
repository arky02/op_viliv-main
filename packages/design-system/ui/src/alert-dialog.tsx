'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@core/utils'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './button'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<
		typeof AlertDialogPrimitive.Overlay
	>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
			className
		)}
		{...props}
		ref={ref}
	/>
))
AlertDialogOverlay.displayName =
	AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<
		typeof AlertDialogPrimitive.Content
	>
>(({ className, ...props }, ref) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogPrimitive.Content
			className={cn(
				'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-6 rounded-md border p-6 shadow-xl duration-200',
				className
			)}
			ref={ref}
			{...props}
		/>
	</AlertDialogPortal>
))
AlertDialogContent.displayName =
	AlertDialogPrimitive.Content.displayName

function AlertDialogHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('flex flex-col space-y-2', className)}
			{...props}
		/>
	)
}
AlertDialogHeader.displayName = 'AlertDialogHeader'

function AlertDialogFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'flex flex-row justify-end space-x-2',
				className
			)}
			{...props}
		/>
	)
}
AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<
		typeof AlertDialogPrimitive.Title
	>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Title
		className={cn(
			'text-foreground text-lg font-bold',
			className
		)}
		ref={ref}
		{...props}
	/>
))
AlertDialogTitle.displayName =
	AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<
		typeof AlertDialogPrimitive.Description
	>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description
		className={cn(
			'text-secondary-foreground text-sm',
			className
		)}
		ref={ref}
		{...props}
	/>
))
AlertDialogDescription.displayName =
	AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<
		typeof AlertDialogPrimitive.Action
	> &
		VariantProps<typeof buttonVariants>
>(
	(
		{ className, variant = 'default', size = 'sm', ...props },
		ref
	) => (
		<AlertDialogPrimitive.Action
			className={cn(
				buttonVariants({
					variant,
					size
				}),
				className
			)}
			ref={ref}
			{...props}
		/>
	)
)
AlertDialogAction.displayName =
	AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<
		typeof AlertDialogPrimitive.Cancel
	> &
		VariantProps<typeof buttonVariants>
>(
	(
		{ className, variant = 'outline', size = 'sm', ...props },
		ref
	) => (
		<AlertDialogPrimitive.Cancel
			className={cn(
				buttonVariants({
					variant,
					size
				}),
				className
			)}
			ref={ref}
			{...props}
		/>
	)
)
AlertDialogCancel.displayName =
	AlertDialogPrimitive.Cancel.displayName

export {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel
}
