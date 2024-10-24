/* eslint-disable react/no-array-index-key */

import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from '@design-system/ui'
import { convertToTimeFormatNumber } from '@/lib/util/convert-to-time-format-number'

interface TimestampAccordionProps {
	textWithTimestamp: {
		text: string
		timeStamp: number
	}[]

	onTimeJump: (time: number) => void
}

export function TimestampAccordion({
	textWithTimestamp = [],
	onTimeJump
}: TimestampAccordionProps) {
	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1" className="border-none">
				<AccordionTrigger className="text-secondary-foreground py-0 hover:no-underline">
					스크립트
				</AccordionTrigger>
				{textWithTimestamp.map((item, index) => {
					const timeStampInSeconds =
						parseFloat(item.timeStamp.toString()) / 1000

					return (
						<AccordionContent key={index}>
							<div className="flex gap-3">
								<div
									className="text-primary cursor-pointer underline"
									onClick={() => onTimeJump(timeStampInSeconds)}
								>
									{convertToTimeFormatNumber(item.timeStamp)}
								</div>
								<div>{item.text}</div>
							</div>
						</AccordionContent>
					)
				})}
			</AccordionItem>
		</Accordion>
	)
}
