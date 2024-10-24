'use client'

import { cn, fileToBase64 } from '@core/utils'
import {
	BucketName,
	supabaseService
} from '@providers/supabase'
import { cloneElement, useRef } from 'react'

export type FileType = {
	name: string
	url: string
	duration: number
}

interface UploaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
	bucket: BucketName
	children: React.ReactElement
	onFileChange: (value: FileType) => void
	accept?: string
	options?: {
		base64?: boolean
	}
	setIsUploading?: (isUploading: boolean) => void // 추가된 부분
}

/**
 * 파일 업로드를 위한 컴포넌트입니다. 원하는 컴포넌트를 이로 감싸주면 됩니다.
 * @param children 업로드 버튼으로 사용할 컴포넌트
 * @param onFileChange 파일이 업로드되었을 때 호출되는 콜백 함수
 * @param accept 업로드 가능한 파일의 확장자를 지정합니다. 기본값은 모든 파일입니다.
 * @param options 업로드 옵션
 * @param options.base64 파일을 base64로 변환하여 콜백 함수에 전달합니다. 기본값은 false입니다.
 * @param setIsUploading 업로드 상태를 관리하는 함수
 * @example
 * ```tsx
 * <Uploader onFileChange={(v) => setImage(v)}>
 *   <Button>hello?</Button>
 * </Uploader>
 * ```
 */
export function Uploader({
	bucket,
	accept,
	children,
	onFileChange,
	options,
	setIsUploading, // 추가된 부분
	className,
	...props
}: UploaderProps) {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const clone = cloneElement(children, {
		onClick: () => {
			fileInputRef.current?.click()
		}
	})

	const getVideoDuration = (file: File): Promise<number> => {
		return new Promise((resolve) => {
			const url = URL.createObjectURL(file)
			const video = document.createElement('video')
			video.preload = 'metadata'

			video.onloadedmetadata = () => {
				URL.revokeObjectURL(url)
				resolve(video.duration)
			}

			video.src = url
		})
	}

	return (
		<div className={className} {...props}>
			{clone}
			<input
				ref={fileInputRef}
				type="file"
				hidden
				accept={accept || '*'}
				onClick={(e) => {
					e.currentTarget.value = ''
				}}
				onChange={async (e) => {
					if (!e.target.files) return
					const file = e.target.files[0]
					if (!file) return

					if (setIsUploading) setIsUploading(true)

					let duration = 0
					if (file.type.startsWith('video/')) {
						duration = await getVideoDuration(file)
					}

					if (options?.base64) {
						fileToBase64(file, (result) => {
							onFileChange({
								name: file.name,
								url: result?.toString() || '',
								duration
							})
							if (setIsUploading) setIsUploading(false)
						})
					} else {
						const filePath = `${Date.now()}`
						try {
							const fileUrl = await supabaseService.uploadFile(
								bucket,
								filePath,
								file
							)
							onFileChange({
								name: file.name,
								url: fileUrl || '',
								duration
							})
						} catch (error) {
							console.error('Failed to upload asset:', error)
							throw error
						} finally {
							if (setIsUploading) setIsUploading(false)
						}
					}
				}}
			/>
		</div>
	)
}

Uploader.displayName = 'Uploader'
