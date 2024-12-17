import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '@design-system/icon'

function VideoWithWatermark({
	src,
	videoRef,
	device = 'pc',
	watermarkText
}: {
	src: string
	videoRef: React.RefObject<HTMLVideoElement>
	device?: 'pc' | 'mobile'
	watermarkText: string
}) {
	const watermarkRef = useRef<HTMLDivElement>(null)
	const videoContainerRef = useRef<HTMLDivElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isOnFullscreen, setIsOnFullscreen] = useState(false)

	const isDevicePC = device === 'pc'

	const toggleFullscreen = () => {
		const container = videoContainerRef.current // video 대신 컨테이너 참조
		if (container) {
			if (document.fullscreenElement) {
				void document.exitFullscreen()
			} else {
				void container.requestFullscreen()
			}
		}
	}

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		// 워터마크 위치 업데이트 함수
		// 5분에 1번 10초동안 워터마크 표시
		const updateWatermarkPosition = () => {
			if (watermarkRef.current) {
				watermarkRef.current.style.display = 'block'
				// top, left 위치 20%~80% 사이로 랜덤하게 위치
				const top = `${Math.random() * 60 + 21}%`
				const left = `${Math.random() * 60 + 21}%`
				watermarkRef.current.style.top = top
				watermarkRef.current.style.left = left
			}
			setTimeout(() => {
				if (watermarkRef.current)
					watermarkRef.current.style.display = 'none'
			}, 1000 * 10) // 10초 동안 워터마크 유지
		}

		if (isPlaying) {
			// 재생중일 때만 워터마크 띄우는 Interval 실행
			interval = setInterval(
				updateWatermarkPosition,
				1000 * 60 * 5 // 5분 간격으로 워터마크 표시
			)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isPlaying])

	useEffect(() => {
		if (!isDevicePC) return

		const handleFullscreenChange = () => {
			// fullscreenElement가 null이면 전체화면 종료
			setIsOnFullscreen(
				document.fullscreenElement === videoContainerRef.current
			)
		}

		// fullscreenchange 이벤트 리스너 추가
		document.addEventListener(
			'fullscreenchange',
			handleFullscreenChange
		)

		// 리스너 정리
		return () => {
			document.removeEventListener(
				'fullscreenchange',
				handleFullscreenChange
			)
		}
	}, [])

	return (
		<div
			ref={videoContainerRef}
			className={
				isDevicePC ? 'content-center' : 'sticky top-0 z-[99]'
			}
		>
			<div className="relative h-fit">
				{/* Watermark */}
				{isPlaying ? (
					<div
						className="pointer-events-none absolute right-1/2 top-1/2 z-[999] hidden text-sm font-semibold text-white opacity-50"
						ref={watermarkRef}
					>
						{watermarkText}
					</div>
				) : (
					<></>
				)}

				{/* Video element */}
				<video
					ref={videoRef}
					src={src}
					controls
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
					controlsList="nodownload noremoteplayback"
					onContextMenu={(e) => e.preventDefault()}
					playsInline
					className={
						isDevicePC
							? `max-pc:hidden w-full rounded-md`
							: 'pc:hidden top-0 z-10 w-full'
					}
				>
					<track kind="captions" label="Korean" />
				</video>

				{/* Fullscreen toggle button */}
				<Icon
					onClick={toggleFullscreen}
					name={
						isOnFullscreen
							? 'FullscreenExitLine'
							: 'FullscreenLine'
					}
					size={isOnFullscreen ? 42 : 35}
					style={{
						top: isOnFullscreen ? '12px' : '8px',
						right: isOnFullscreen ? '12px' : '8px'
					}}
					className="max-pc:hidden absolute right-2 top-2 z-10 rounded px-2 py-1 text-white opacity-80"
				/>
			</div>

			{/* CSS for hiding fullscreen button */}
			<style>{`
				video::-webkit-media-controls-fullscreen-button {
					display: none !important;
				}
				video::-moz-media-controls-fullscreen-button {
					display: none !important;
				}
				video::fullscreen video::-webkit-media-controls {
					display: block;
				}
			`}</style>
		</div>
	)
}

export default VideoWithWatermark
