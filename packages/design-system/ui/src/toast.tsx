'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import {
	cva,
	type VariantProps
} from 'class-variance-authority'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { buttonVariants } from './button'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Viewport>,
	React.ComponentPropsWithoutRef<
		typeof ToastPrimitives.Viewport
	>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Viewport
		className={cn(
			'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
			className
		)}
		ref={ref}
		{...props}
	/>
))
ToastViewport.displayName =
	ToastPrimitives.Viewport.displayName

const toastVariants = cva(
	'data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full group pointer-events-auto relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-[50px] transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				negative: 'negative bg-negative/10 text-negative',
				cautionary:
					'cautionary bg-cautionary/10 text-cautionary',
				positive: 'positive bg-positive/10 text-positive',
				informative:
					'informative bg-informative/10 text-informative'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

const Toast = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Root>,
	React.ComponentPropsWithoutRef<
		typeof ToastPrimitives.Root
	> &
		VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
	return (
		<ToastPrimitives.Root
			className={cn(
				toastVariants({
					variant
				}),
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Action>,
	React.ComponentPropsWithoutRef<
		typeof ToastPrimitives.Action
	>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Action
		className={cn(
			buttonVariants({
				size: 'sm',
				variant: 'outline'
			}),
			className
		)}
		ref={ref}
		{...props}
	/>
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Close>,
	React.ComponentPropsWithoutRef<
		typeof ToastPrimitives.Close
	>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Close
		className={cn(
			'text-foreground group-[.negative]:text-negative group-[.cautionary]:text-cautionary group-[.positive]:text-positive group-[.informative]:text-informative absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100',
			className
		)}
		ref={ref}
		toast-close=""
		{...props}
	>
		<Icon name="CloseLine" className="size-4" />
	</ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Title>,
	React.ComponentPropsWithoutRef<
		typeof ToastPrimitives.Title
	>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Title
		className={cn('font-semibold', className)}
		ref={ref}
		{...props}
	/>
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Description>,
	React.ComponentPropsWithoutRef<
		typeof ToastPrimitives.Description
	>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Description
		className={cn('text-sm font-light', className)}
		ref={ref}
		{...props}
	/>
))
ToastDescription.displayName =
	ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<
	typeof Toast
>

type ToastActionElement = React.ReactElement<
	typeof ToastAction
>

export {
	type ToastProps,
	type ToastActionElement,
	ToastProvider,
	ToastViewport,
	Toast,
	ToastTitle,
	ToastDescription,
	ToastClose,
	ToastAction
}
