import { cn } from '@core/utils'
import * as React from 'react'

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn(
			'border-border bg-background rounded-lg border shadow-sm',
			className
		)}
		ref={ref}
		{...props}
	/>
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn('flex flex-col gap-y-1 p-6', className)}
		ref={ref}
		{...props}
	/>
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	// eslint-disable-next-line jsx-a11y/heading-has-content -- Fixed by Shadcn
	<h3
		className={cn('font-bold', className)}
		ref={ref}
		{...props}
	/>
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		className={cn(
			'text-secondary-foreground text-sm',
			className
		)}
		ref={ref}
		{...props}
	/>
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn(
			'flex flex-col gap-2 p-6 pt-0 text-sm font-medium',
			className
		)}
		ref={ref}
		{...props}
	/>
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		className={cn('flex items-center p-6 pt-0', className)}
		ref={ref}
		{...props}
	/>
))
CardFooter.displayName = 'CardFooter'

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
}
