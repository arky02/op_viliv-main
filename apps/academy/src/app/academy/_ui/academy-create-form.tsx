'use client'

import {
	Button,
	Form,
	FormField,
	FormFieldItem,
	Input,
	toast,
	useForm
} from '@design-system/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from '@core/react'
import { Icon } from '@design-system/icon'
import { useRouter } from 'next/navigation'
import {
	type CreateAcademyDto,
	createAcademyDto
} from '@/module/academy/model'
import { createAcademyAction } from '@/module/academy/action'
import { DaumAddressInput } from './daum-address-input'
import { ProfileImageSection } from './profile-image-section'

interface AcademyCreateFormProps {
	phoneNumber: string | undefined
}

export function AcademyCreateForm({
	phoneNumber
}: AcademyCreateFormProps) {
	const router = useRouter()
	const createAction = useAction(createAcademyAction, {
		onSuccess: () => {
			toast({
				title: '기관 생성 성공',
				variant: 'positive'
			})
			router.replace(`/academy`)
		}
	})
	const form = useForm<CreateAcademyDto>({
		resolver: zodResolver(createAcademyDto),
		defaultValues: {
			postalCode: '',
			address: '',
			detailAddress: '',
			name: '',
			phoneNumber,
			image: ''
		}
	})

	function onSubmit(data: CreateAcademyDto) {
		createAction.execute(data)
	}

	const goBack = () => {
		router.back()
	}

	return (
		<div className="max-pc:justify-start mx-auto flex h-full max-w-[640px] flex-col justify-center gap-10 p-4">
			<div className="max-pc:hidden flex items-center justify-between">
				<div className="text-2xl font-semibold">
					기관 생성하기
				</div>
				<button type="button" onClick={goBack}>
					<Icon
						name="CloseFill"
						size={32}
						className="hover:cursor-pointer"
					/>
				</button>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="pc:gap-8 grid gap-6"
				>
					{/* 이미지*/}
					<FormField
						name="image"
						render={({ field }) => (
							<FormFieldItem label={false}>
								<ProfileImageSection {...field} />
							</FormFieldItem>
						)}
					/>

					{/* 기관 이름 */}
					<FormField
						name="name"
						render={({ field }) => (
							<FormFieldItem title="기관 이름">
								<Input
									{...field}
									placeholder="기관 이름을 입력해 주세요"
								/>
							</FormFieldItem>
						)}
					/>

					{/* 주소 */}
					<div className="grid gap-2">
						<FormField
							name="postalCode"
							render={({ field }) => (
								<FormFieldItem title="주소">
									<DaumAddressInput
										value={field.value}
										onDaumPostcodeChange={(data) => {
											form.setValue('postalCode', data.zonecode)
											form.setValue('address', data.address)
											form.setFocus('detailAddress')
										}}
									/>
								</FormFieldItem>
							)}
						/>

						<FormField
							name="address"
							render={({ field }) => (
								<FormFieldItem>
									<Input
										placeholder="주소 (자동입력)"
										{...field}
										readOnly
									/>
								</FormFieldItem>
							)}
						/>

						<FormField
							name="detailAddress"
							render={({ field }) => (
								<FormFieldItem>
									<Input
										placeholder="상세주소를 입력해주세요"
										{...field}
									/>
								</FormFieldItem>
							)}
						/>
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={createAction.isExecuting}
					>
						저장하기
					</Button>
				</form>
			</Form>
		</div>
	)
}
