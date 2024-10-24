'use client'

import { Uploader } from '@design-system/template'
import {
	Button,
	type ControllerRenderProps
} from '@design-system/ui'
import { cn } from '@core/utils'
import { ProfileAvatar } from '@/app/_ui/profile-avatar'

interface ProfileImageSectionProps {
	image: string
}

export function ProfileImageSection({
	value,
	onChange
}: Pick<
	ControllerRenderProps<ProfileImageSectionProps, 'image'>,
	'value' | 'onChange'
>) {
	return (
		<div className="flex w-full items-end justify-between gap-4">
			<ProfileAvatar
				imageUrl={value}
				name="프로필"
				className="h-20 w-20 rounded-lg"
			/>
			<div className="flex items-center gap-2">
				<Uploader
					bucket="images"
					accept="image/*"
					onFileChange={(v) => {
						onChange(v.url)
					}}
				>
					<Button
						type="button"
						variant="secondary"
						className="w-fit"
					>
						업로드
					</Button>
				</Uploader>
				<Button
					type="button"
					variant="secondary"
					className={cn('w-fit', !value && 'hidden')}
					onClick={() => {
						onChange('')
					}}
				>
					삭제
				</Button>
			</div>
		</div>
	)
}
