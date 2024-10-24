import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { badgeVariants } from '@design-system/ui'
import React from 'react'

export interface TagInputProps {
	tagList: string[]
	placeholder?: string
	maxTagCount?: number
	className?: string
	onChange: (updatedList: string[]) => void
}

/**
 * 태그를 입력할 수 있는 인풋입니다.
 * 기본 구분자는 쉼표(,)입니다.
 * <br/> @param tagList 태그 목록
 * <br/> @param placeholder 인풋의 placeholder
 * <br/> @param maxTagCount 최대 태그 개수
 * <br/> @param onChange 태그 목록이 변경되었을 때 호출되는 함수
 */
const TagInput = React.forwardRef<
	HTMLInputElement,
	TagInputProps
>(
	(
		{
			tagList,
			placeholder,
			maxTagCount,
			onChange,
			className
		},
		ref
	) => {
		const handleRemove = (index: number) => {
			const newTags = tagList.filter((_, i) => index !== i)
			onChange(newTags)
		}
		const handleKeyUp = (
			e: React.KeyboardEvent<HTMLInputElement>
		) => {
			e.preventDefault()
			if (e.key === ',') {
				const value = e.currentTarget.value
				const tag = value.substring(0, value.length - 1)
				e.currentTarget.value = ''
				if (maxTagCount && tagList.length >= maxTagCount) return
				if (tagList.includes(tag)) return
				if (tag === '') return
				onChange([...tagList, tag])
			}
		}

		return (
			<label htmlFor="editor">
				<div
					className={cn(
						'border-strong bg-background ring-offset-background focus-within:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
						className
					)}
				>
					<div className="flex flex-wrap gap-2">
						{tagList.map((tag, i) => (
							<div
								key={tag}
								className={cn(
									badgeVariants(),
									'flex cursor-pointer items-center gap-1'
								)}
								onClick={() => handleRemove(i)}
							>
								<span>{tag}</span>
								<Icon name="CloseLine" className="size-4" />
							</div>
						))}

						<input
							id="editor"
							className="placeholder:text-muted-foreground w-full bg-transparent outline-none"
							placeholder={tagList.length === 0 ? placeholder : ''}
							type="text"
							onKeyUp={handleKeyUp}
							ref={ref}
						/>
					</div>
				</div>
				{maxTagCount && (
					<div className="text-muted-foreground mt-2 text-right text-sm">
						{tagList.length} / {maxTagCount}
					</div>
				)}
			</label>
		)
	}
)
TagInput.displayName = 'TagInput'

export { TagInput }
