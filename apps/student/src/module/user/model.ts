import { Prisma } from '@core/models'
import { z } from 'zod'

export const USER_INFORMATION_SELECT_CONFIG =
	Prisma.validator<Prisma.UserSelect>()({
		name: true,
		image: true,
		id: true,
		phoneNumber: true,
		academyMembers: {
			select: {
				role: true,
				isAlertSubscribed: true
			}
		}
	})

export type UserInformationDto = Prisma.UserGetPayload<{
	select: typeof USER_INFORMATION_SELECT_CONFIG
}>

export const GET_ACADEMIES_SELECT_CONFIG =
	Prisma.validator<Prisma.AcademySelect>()({
		id: true,
		name: true
	})

export type GetAcademiesInclude = Prisma.AcademyGetPayload<{
	select: typeof GET_ACADEMIES_SELECT_CONFIG
}>

export const GetAcademiesArgs =
	{} satisfies Prisma.AcademyFindManyArgs

export const getMyUserInfoInclude = {
	_count: true
} satisfies Prisma.UserInclude
export type GetMyUserInfo = Prisma.UserGetPayload<{
	include: typeof getMyUserInfoInclude
}>

export const imageUpdateDto = z.object({
	image: z.string()
})
export type ImageUpdateDto = z.infer<typeof imageUpdateDto>
export const deviceUpdateDto =z.object({
	device1: z.string(),
	device2: z.string(),
	device3: z.string()
})
export type DeviceUpdateDto = z.infer<typeof deviceUpdateDto>

export const deviceChangeReasonUpdateDto = z.object({
	device_change_reason: z.string()
})
export type DeviceChangeReasonUpdateDto = z.infer<typeof deviceChangeReasonUpdateDto>