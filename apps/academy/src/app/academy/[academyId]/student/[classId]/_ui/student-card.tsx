import Image from 'next/image'
import { Button, toast } from '@design-system/ui'
import { useAction } from '@core/react'
import defaultImage from '@/lib/asset/image/square-default-image.png'
import { type GetStudents } from '@/module/student/model'
import {
	acceptStudentAction,
	rejectStudentAction
} from '@/module/student/action'
import { BanishStudentModal } from './banish-student-modal'

interface StudentCardProps {
	student: GetStudents
}

export function StudentCard({ student }: StudentCardProps) {
	const acceptStudent = useAction(acceptStudentAction, {
		onSuccess: () => {
			toast({
				title: '학생을 승인했어요',
				variant: 'positive'
			})
		},
		onError: (error) => {
			toast({
				title: '학생 승인에 실패했습니다',
				variant: 'negative'
			})
		}
	})

	const handleAcceptStudent = () => {
		acceptStudent.execute(student.id)
	}

	const rejectStudent = useAction(rejectStudentAction, {
		onSuccess: () => {
			toast({
				title: '학생을 거절했어요',
				variant: 'positive'
			})
		},
		onError: (error) => {
			toast({
				title: '학생 거절에 실패했습니다',
				variant: 'negative'
			})
		}
	})

	const handleRejectStudent = () => {
		rejectStudent.execute(student.id)
	}

	return (
		<div className="flex justify-between p-4">
			<div className="flex gap-4">
				<Image
					src={defaultImage}
					width={44}
					height={44}
					alt="userProfile"
					className="rounded-full border"
				/>
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<div className="text-sm font-semibold">
							{student.user?.name}
						</div>
					</div>
					<div className="text-secondary-foreground text-xs">
						{student.phoneNumber}
					</div>
				</div>
			</div>
			<div className="flex gap-2">
				{student.isPending ? (
					<>
						<Button
							size="sm"
							variant="secondary"
							onClick={handleAcceptStudent}
						>
							승인
						</Button>
						<Button
							size="sm"
							variant="secondary"
							onClick={handleRejectStudent}
						>
							거절
						</Button>
					</>
				) : (
					<BanishStudentModal studentId={student.id} />
				)}
			</div>
		</div>
	)
}
