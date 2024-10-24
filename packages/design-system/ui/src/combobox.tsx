'use client'

import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import type { VariantProps } from 'class-variance-authority'
import { useState } from 'react'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem
} from './command'
import { inputVariants } from './input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from './popover'

interface ComboboxProps
	extends VariantProps<typeof inputVariants> {
	data: {
		value: string
		label: string
	}[]
	placeholder?: string
	searchPlaceholder?: string
	emptyPlaceholder?: string
	multiple?: boolean
	defaultValue?: string[]
	onValueChange: (value: string[]) => void
}

/**
 * 검색기능을 제공하는 콤보박스 컴포넌트입니다.
 *
 * - `data` : 콤보박스에 표시할 데이터
 * - `placeholder` : 콤보박스가 비어있을 때 표시할 텍스트
 * - `searchPlaceholder` : 검색창에 표시할 텍스트
 * - `emptyPlaceholder` : 검색 결과가 없을 때 표시할 텍스트
 * - `multiple` : 다중 선택 가능 여부
 * - `defaultValue` : 초기값
 * - `onValueChange` : 값이 변경될 때 호출되는 콜백
 */
function Combobox(props: ComboboxProps) {
	const {
		data,
		size,
		placeholder,
		emptyPlaceholder,
		searchPlaceholder,
		multiple,
		defaultValue,
		onValueChange
	} = props
	const getDefaultValue = () => {
		if (!defaultValue) return []
		return defaultValue.map((v) => v.toLowerCase())
	}
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(getDefaultValue())

	const renderLabel = () => {
		if (!value.length) {
			return (
				<div className="text-muted-foreground">
					{placeholder}
				</div>
			)
		}
		if (multiple) {
			return value
				.map((v) => data.find((d) => d.value === v)?.label)
				.join(', ')
		}
		return data.find(
			(d) => d.value.toLowerCase() === value[0]
		)?.label
	}
	const handleSelect = (currentValue: string) => {
		let newValue: string[] = []
		const isIncluded = value.includes(currentValue)
		if (multiple) {
			newValue = isIncluded
				? value.filter((v) => v !== currentValue)
				: [...value, currentValue]
		} else {
			newValue = isIncluded ? [] : [currentValue]
			setOpen(false)
		}
		setValue(newValue)
		onValueChange(newValue)
	}

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger
				className={cn(
					inputVariants({
						size
					}),
					'flex w-full items-center justify-between gap-4'
				)}
			>
				{renderLabel()}
				<Icon
					name="ArrowDownSLine"
					className="text-secondary-foreground size-4"
				/>
			</PopoverTrigger>
			<PopoverContent className="!p-0">
				<Command
					filter={(v, search) => {
						const withValue = v.startsWith(search)
						const withLabel = data
							.find((e) => e.value === v)
							?.label.startsWith(search)
						if (withValue || withLabel) return 1
						return 0
					}}
				>
					<CommandInput placeholder={searchPlaceholder} />
					<CommandEmpty>{emptyPlaceholder}</CommandEmpty>
					<CommandGroup>
						{data.map((e) => (
							<CommandItem
								className="justify-between"
								key={e.value}
								onSelect={handleSelect}
								value={e.value}
							>
								{e.label}
								<Icon
									name="CheckLine"
									className={cn(
										'size-4',
										value.includes(e.value.toLowerCase())
											? 'opacity-100'
											: 'opacity-0'
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
Combobox.displayName = 'Combobox'

export { Combobox }
