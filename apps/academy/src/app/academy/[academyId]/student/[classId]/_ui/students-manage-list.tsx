'use client'

import { Button, toast } from '@design-system/ui'
import { useState } from 'react'
import { type GetClassInfo } from '@/module/academyClass/model'
import { type GetStudents } from '@/module/student/model'
import { StudentCard } from './student-card'
import { InviteCodeEditModal } from './invite-code-edit-modal'
import { DeviceChangeReasonCard } from './device-change-reason-card'

interface DeviceChangeRequestType {
	student: GetStudents
	deviceChangeRequest: {
		deviceToChange: string
		deviceType: string
		reason: string
	}
}

interface StudentsManageListProps {
	academyClassInfo: GetClassInfo
	students: GetStudents[]
	deviceChangeRequests: object[]
}

export function StudentsManageList({
	academyClassInfo,
	students,
	deviceChangeRequests
}: StudentsManageListProps) {
	const [filter, setFilter] = useState<
		'학생' | '대기중' | '기기 변경 요청'
	>('학생')

	const finedDeviceChangeRequests = deviceChangeRequests.map(
		(obj) =>
			({
				...obj,
				deviceChangeRequest: JSON.parse(
					JSON.parse(
						// @ts-expect-error "obj is typeof DeviceChangeRequestType"
						obj?.deviceChangeReason.value as string
					) as string
				)
			}) as DeviceChangeRequestType
	)

	const filteredStudents = students.filter(
		(student: GetStudents) => {
			if (filter === '학생') {
				return !student.isPending
			}
			return student.isPending
		}
	)

	const academyClassId = academyClassInfo.id
	const inviteCode = academyClassInfo.inviteCode

	const handleCopyInviteCode = async () => {
		try {
			await navigator.clipboard.writeText(inviteCode)
			toast({
				title: '초대 코드를 복사했어요',
				description:
					'초대하고싶은 학생에게 초대 코드를 전달해 주세요!',
				variant: 'positive'
			})
		} catch (err) {
			toast({
				title: '초대 코드 복사에 실패했습니다.',
				variant: 'negative'
			})
		}
	}

	return (
		<div className="pc:px-8 pc:py-6 p-4">
			<div className="pc:gap-6 flex flex-col gap-4">
				<div className="pc:px-8 pc:py-6 border-border-strong bg-border pc:gap-[10px] flex items-center gap-2 rounded-xl border px-6 py-5">
					<div className="text-secondary-foreground flex flex-1 flex-col text-sm">
						<div className="font-medium">초대코드</div>
						<div className="font-bold">
							{academyClassInfo.inviteCode}
						</div>
					</div>
					<Button
						size="sm"
						variant="outline"
						onClick={handleCopyInviteCode}
					>
						복사
					</Button>
					<InviteCodeEditModal
						academyClassId={academyClassId}
						inviteCode={inviteCode}
					/>
				</div>
				<div className="bg-muted max-pc:w-full flex w-fit items-center rounded-md p-1 text-sm font-medium">
					<div
						className={`max-pc:w-1/2 rounded-sm px-4 py-2 text-center hover:cursor-pointer ${filter === '학생' ? 'bg-background' : 'bg-muted'}`}
						onClick={() => setFilter('학생')}
					>
						학생
					</div>
					<div
						className={`max-pc:w-1/2 rounded-sm px-4 py-2 text-center hover:cursor-pointer ${filter === '대기중' ? 'bg-background' : 'bg-muted'}`}
						onClick={() => setFilter('대기중')}
					>
						대기중
					</div>
					<div
						className={`max-pc:w-1/2 rounded-sm px-4 py-2 text-center hover:cursor-pointer ${filter === '기기 변경 요청' ? 'bg-background' : 'bg-muted'}`}
						onClick={() => setFilter('기기 변경 요청')}
					>
						기기 변경 요청
					</div>
				</div>
				<div className="pc:gap-4 bg-background grid grid-cols-1 gap-3 divide-y rounded-xl border p-5">
					{filter === '기기 변경 요청'
						? finedDeviceChangeRequests.map((obj) => (
								<DeviceChangeReasonCard
									key={obj.student.id}
									requestObj={obj}
								/>
							))
						: filteredStudents.map((student) => (
								<StudentCard key={student.id} student={student} />
							))}
				</div>
			</div>
		</div>
	)
}
