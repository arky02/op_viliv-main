'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@core/utils'

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		className={cn(
			'relative flex w-full touch-none select-none items-center',
			className
		)}
		ref={ref}
		{...props}
	>
		<SliderPrimitive.Track className="bg-muted relative h-2 w-full grow overflow-hidden rounded-full">
			<SliderPrimitive.Range className="bg-primary absolute h-full" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="border-primary bg-background block h-5 w-5 rounded-full border-2 outline-none transition-colors disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
