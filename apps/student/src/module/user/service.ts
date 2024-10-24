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
}

export const userService = new UserService()
