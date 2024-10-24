'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import {
	cva,
	type VariantProps
} from 'class-variance-authority'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<
		typeof SheetPrimitive.Overlay
	>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Overlay
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
			className
		)}
		{...props}
		ref={ref}
	/>
))
SheetOverlay.displayName =
	SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
	'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col overflow-auto p-6 shadow-xl transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
	{
		variants: {
			side: {
				top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top max-pc:max-h-[calc(100vh-80px)] inset-x-0 top-0 max-h-[400px] border-b',
				bottom:
					'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom max-pc:max-h-[calc(100vh-80px)] inset-x-0 bottom-0 max-h-[400px] border-t',
				left:
					'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left max-pc:w-[calc(100vw-20px)] inset-y-0 left-0 h-full max-w-[400px] border-r',
				right:
					'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right max-pc:max-pc:w-[calc(100vw-20px)] inset-y-0 right-0 h-full max-w-[400px] border-l'
			}
		},
		defaultVariants: {
			side: 'right'
		}
	}
)

interface SheetContentProps
	extends React.ComponentPropsWithoutRef<
			typeof SheetPrimitive.Content
		>,
		VariantProps<typeof sheetVariants> {
	hideClose?: boolean
}

const SheetContent = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Content>,
	SheetContentProps
>(
	(
		{
			side = 'right',
			hideClose,
			className,
			children,
			...props
		},
		ref
	) => (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				className={cn(
					sheetVariants({
						side
					}),
					className
				)}
				ref={ref}
				{...props}
			>
				{!hideClose && (
					<SheetPrimitive.Close className="sticky right-0 top-0 self-end">
						<Icon
							name="CloseLine"
							className="text-foreground size-5"
						/>
						<span className="sr-only">Close</span>
					</SheetPrimitive.Close>
				)}
				<div className="flex h-full flex-col gap-6">
					{children}
				</div>
			</SheetPrimitive.Content>
		</SheetPortal>
	)
)
SheetContent.displayName =
	SheetPrimitive.Content.displayName

function SheetHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('flex flex-col space-y-1', className)}
			{...props}
		/>
	)
}
SheetHeader.displayName = 'SheetHeader'

function SheetFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'sticky bottom-0 flex items-center justify-end gap-2',
				className
			)}
			{...props}
		/>
	)
}
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Title
		className={cn(
			'text-foreground text-lg font-bold',
			className
		)}
		ref={ref}
		{...props}
	/>
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Description>,
	React.ComponentPropsWithoutRef<
		typeof SheetPrimitive.Description
	>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description
		className={cn(
			'text-secondary-foreground text-sm',
			className
		)}
		ref={ref}
		{...props}
	/>
))
SheetDescription.displayName =
	SheetPrimitive.Description.displayName

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription
}
