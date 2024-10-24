import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { ImageContainer } from '@design-system/ui'
import { Uploader } from './uploader'

interface ImageUploaderProps
	extends Omit<
		React.ComponentProps<typeof Uploader>,
		'children'
	> {
	label?: string
}
/**
 * 사용자가 이미지를 선택하고 업로드할 수 있도록 하는 컴포넌트입니다.
 * props는 Uploader 컴포넌트와 동일합니다.
 */
function ImageUploader({
	className,
	label = '이미지 추가',
	accept = 'image/*',
	...props
}: ImageUploaderProps) {
	return (
		<Uploader accept={accept} {...props}>
			<div
				className={cn(
					'text-secondary-foreground bg-secondary flex aspect-square w-36 flex-col items-center justify-center gap-1 rounded-md',
					className
				)}
			>
				<Icon name="AddLine" className="size-10" />
				<span className="text-sm">{label}</span>
			</div>
		</Uploader>
	)
}
ImageUploader.displayName = 'ImageUploader'

interface UploadedImageProps {
	src: string
	onRemove: () => void
	className?: string
}
/**
 * uploaded-image 컴포넌트를 통해 업로드한 이미지를 확인하고 삭제할 수 있습니다.
 */
function UploadedImage({
	src,
	className,
	onRemove
}: UploadedImageProps) {
	return (
		<div
			className={cn(
				'relative aspect-square w-36 overflow-hidden rounded-md',
				className
			)}
		>
			<ImageContainer
				src={src}
				alt=""
				width={144}
				height={144}
			/>
			<button
				className="absolute bottom-2 right-2 rounded-md bg-black/50 p-1"
				onClick={onRemove}
			>
				<Icon
					name="CloseLine"
					className="text-primary-foreground"
				/>
			</button>
		</div>
	)
}
UploadedImage.displayName = 'UploadedImage'

export { ImageUploader, UploadedImage }
