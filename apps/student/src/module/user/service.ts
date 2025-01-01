import { db } from '@core/models'
import {
	type ImageUpdateDto,
	getMyUserInfoInclude
} from './model'

class UserService {
	async updateImage(
		phoneNumber: string,
		dto: ImageUpdateDto
	) {
		const { image } = dto
		const user = await db.user.findUnique({
			where: { phoneNumber },
			select: { image: true }
		})

		if (!user) {
			throw new Error('User not found')
		}

		const updatedUser = await db.user.update({
			where: { phoneNumber },
			data: {
				image
			}
		})

		return updatedUser.image
	}

	async getMyUserInfo(id: string) {
		const user = await db.user.findUnique({
			where: { id },
			include: getMyUserInfoInclude
		})
		return user
	}

	async getPhoneNumberByUserId(id: string) {
		const user = await db.user.findUnique({
			where: {
				id
			}
		})
		return user?.phoneNumber

	}
	async updateImageUrl(userId: string, dto: ImageUpdateDto) {
		const { image } = dto
		const user = await db.user.findUnique({
			where: { id: userId },
			select: { image: true }
		})

		if (!user) {
			throw new Error('User not found')
		}

		const updatedUser = await db.user.update({
			where: { id: userId },
			data: {
				image
			}
		})

		return updatedUser.image
	}

	async updateUserName(userId: string, name: string) {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: {
				name
			}
		})

		return updatedUser
	}

	// 기기 정보 가져오기 및 업데이트
	async getDeviceInfoByUserId(id: string) {
		const user = await db.user.findUnique({
			where: {
				id
			}
		})
		console.log(user)
		return {mobile: user?.device1 || '', tablet: user?.device2 || '', pc: user?.device3 || ''}
	}

	async updateMobileDeviceInfo(userId: string, deviceName: string) {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: {
				device1: deviceName
			}
		})

		return String(updatedUser?.device1 ?? '')
	}
	async updateTabletDeviceInfo(userId: string, deviceName: string) {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: {
				device2: deviceName
			}
		})

		return String(updatedUser?.device2 ?? '')
	}
	async updatePcDeviceInfo(userId: string, deviceName: string) {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: {
				device3: deviceName
			}
		})

		return String(updatedUser?.device3 ?? '')
	}

	// 기기 변경 사유 가져오기 및 업데이트
	async getDeviceChangeReasonByUserId(id: string) {
		const user = await db.user.findUnique({
			where: {
				id
			}
		})
		return String(user?.device_change_reason ?? '')
	}

	async updateDeviceChangeReason(userId: string, reason: string) {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: {
				device_change_reason: reason
			}
		})

		return String(updatedUser?.device_change_reason ?? '')
	}
}

export const userService = new UserService()
