'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<
		typeof CheckboxPrimitive.Root
	>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		className={cn(
			'border-strong aria-checked:bg-primary aria-checked:text-primary-foreground aria-checked:border-primary disabled:bg-muted peer h-4 w-4 shrink-0 rounded-sm border disabled:cursor-not-allowed',
			className
		)}
		ref={ref}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn(
				'flex h-full w-full items-center justify-center text-current'
			)}
		>
			<Icon name="CheckLine" className="size-3" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
