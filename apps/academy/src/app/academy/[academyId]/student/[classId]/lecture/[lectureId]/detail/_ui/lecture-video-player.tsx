'use client'

import React, { useRef, useEffect, useState } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { type GetLectureInfo } from '@/module/lecture/model'

function VideoPlayer({
	lecture,
	device = 'pc',
	watermarkText = ''
}: {
	lecture: GetLectureInfo
	device?: 'pc' | 'mobile'
	watermarkText?: string
}) {
	const videoRef = useRef<HTMLVideoElement>(null)
	const watermarkRef = useRef<HTMLDivElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		if (videoRef.current) {
			// Plyr 인스턴스 생성
			const player = new Plyr(videoRef.current, {
				controls: [
					'play',
					'progress',
					'current-time',
					'mute',
					'volume',
					'fullscreen',
					'captions',
					'settings'
				],
				previewThumbnails: {
					enabled: true,
					src: lecture.thumbnailUrl ?? ''
				}
			})

			player.on('play', () => {
				setIsPlaying(true)
			})

			player.on('pause', () => {
				setIsPlaying(false)
			})

			player.on('enterfullscreen', () => {
				setIsPlaying(true)
			})
		}
	}, [])

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
			interval = setInterval(
				updateWatermarkPosition,
				1000 * 10
			) // isPlaying일 때만 워터마크 띄우는 Interval 실행, 5분 간격으로 워터마크 표시
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isPlaying]) // 비디오 playing 중일 때만 실행

	// 워터마크 스타일
	const watermarkStyle: React.CSSProperties = {
		position: 'absolute',
		fontSize: '16px',
		fontWeight: 600,
		color: 'rgba(238, 238, 238, 0.5)',
		zIndex: 999,
		pointerEvents: 'none',
		display: 'none'
	}
	return (
		<div
			className={
				device === 'pc'
					? 'max-pc:hidden relative overflow-hidden rounded-md'
					: 'pc:hidden sticky top-0 z-10 w-full'
			}
		>
			<video
				ref={videoRef}
				src={lecture.videoUrl}
				controlsList="nodownload"
				playsInline
				className="plyr w-full"
			>
				<track kind="captions" label="Korean" />
			</video>

			{/* 워터마크 div */}
			<div
				className={`plyr__watermark--${device}`}
				ref={watermarkRef}
				style={{
					...watermarkStyle,
					display: isPlaying ? 'block' : 'none'
				}}
			>
				{watermarkText}
			</div>
		</div>
	)
}

export default VideoPlayer
