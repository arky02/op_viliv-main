'use client'

import { Icon } from '@design-system/icon'
import {
	Toast,
	ToastClose,
	ToastDescription,
	type ToastProps,
	ToastProvider,
	ToastTitle,
	ToastViewport
} from './toast'
import { useToast } from './use-toast'

export function Toaster() {
	const { toasts } = useToast()

	const switchToastIcon = (
		variant: ToastProps['variant']
	) => {
		switch (variant) {
			case 'negative':
				return <Icon name="AlertFill" />
			case 'cautionary':
				return <Icon name="ErrorWarningFill" />
			case 'positive':
				return <Icon name="CheckboxCircleFill" />
			case 'informative':
				return <Icon name="InformationFill" />
			default:
				return null
		}
	}

	return (
		<ToastProvider>
			{toasts.map(
				({
					id,
					title,
					description,
					action,
					variant,
					...props
				}) => {
					return (
						<Toast key={id} variant={variant} {...props}>
							<div className="flex items-center gap-4">
								{switchToastIcon(variant)}
								<div className="grid gap-1">
									{title ? <ToastTitle>{title}</ToastTitle> : null}
									{description ? (
										<ToastDescription>{description}</ToastDescription>
									) : null}
								</div>
							</div>
							{action}
							<ToastClose />
						</Toast>
					)
				}
			)}
			<ToastViewport />
		</ToastProvider>
	)
}
