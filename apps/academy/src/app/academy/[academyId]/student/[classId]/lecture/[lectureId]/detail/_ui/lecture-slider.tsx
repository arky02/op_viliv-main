'use client'

import { Icon } from '@design-system/icon'
import { useState } from 'react'

function Slider({
	children,
	slidesToShow = 1
}: {
	children: React.ReactNode[]
	slidesToShow?: number
}) {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % children.length)
	}

	const prevSlide = () => {
		setCurrentIndex(
			(prev) => (prev - 1 + children.length) % children.length
		)
	}
	const goToSlide = (index: number) => {
		setCurrentIndex(index)
	}

	if (children.length === 1) return <>{children}</>

	return (
		<div className="flex flex-col items-center gap-[8px]">
			<div className="relative w-fit overflow-hidden">
				<div
					className="flex transition-transform duration-300 ease-in-out"
					style={{
						transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`
					}}
				>
					{children}
				</div>
				<div className="z-5 absolute left-0 top-0 flex h-full w-[40px] items-center bg-gradient-to-r from-[#00000035] to-transparent">
					<Icon
						onClick={prevSlide}
						name="ArrowLeftSLine"
						size={40}
						color="#ffffff"
						className="hover:cursor-pointer"
					/>
				</div>
				<div className="z-5 absolute right-0 top-0 flex h-full w-[40px] items-center bg-gradient-to-l from-[#00000035] to-transparent">
					<Icon
						onClick={nextSlide}
						name="ArrowRightSLine"
						size={40}
						color="#ffffff"
						className="hover:cursor-pointer"
					/>
				</div>
			</div>
			{/* Indicator */}
			<div className="flex space-x-2">
				{children.map((child, index) => (
					<div
						key={index}
						onClick={() => goToSlide(index)}
						className={`h-[5px] w-[5px] cursor-pointer rounded-full ${currentIndex === index ? 'bg-gray-600' : 'bg-gray-200'}`}
					/>
				))}
			</div>
		</div>
	)
}

export default Slider
