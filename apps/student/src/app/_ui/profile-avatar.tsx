import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@design-system/ui'
import Image from 'next/image'
import squareDefaultImage from '@/lib/asset/image/square-default-image.png'

/**
 * @param imageUrl - 프로필 이미지 URL
 * @param name - 이미지 대체 텍스트 (alt)
 */
export function ProfileAvatar({
	imageUrl,
	name,
	size = 'md',
	isDefaultLogo,
	className
}: {
	imageUrl: string
	name: string
	className?: string
	size?: 'xs' | 'sm' | 'md' | 'lg'
	isDefaultLogo?: boolean
}) {
	return (
		<Avatar
			className={cn(
				'h-[80] w-[80] rounded-lg',
				size === 'sm' && 'h-[52px] w-[52px]',
				className
			)}
		>
			<AvatarImage
				src={imageUrl}
				alt={`${name}-profile`}
				className="aspect-square object-cover"
			/>
			<AvatarFallback className={cn('bg-secondary')}>
				{isDefaultLogo ? (
					<Image
						src={squareDefaultImage}
						alt="default-image"
						width={80}
						height={80}
						className="aspect-square object-cover object-center"
					/>
				) : (
					<Image
						src={squareDefaultImage}
						alt="default-image"
						width={80}
						height={80}
						className="aspect-square object-cover object-center"
					/>
				)}
			</AvatarFallback>
		</Avatar>
	)
}
