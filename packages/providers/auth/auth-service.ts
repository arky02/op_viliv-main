// auth-service.ts
// auth-service.ts

import { NextAuthConfig } from 'next-auth'
import { auth } from './auth'
import { authOptions } from './auth-option'

class AuthService {
  constructor(private readonly options: NextAuthConfig) {}

  get getAuthOptions() {
    return this.options
  }

  async getMySession() {
    const session = await auth()
    // return session

    // TEST
    return {
      user: {
        name: '김기연',
        email: 'kyean72@naver.com',
        image:
          'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
        id: 'cm37ne2rx0000102j9kod6it6'
      },
      expires: '2024-12-11T07:36:19.228Z'
    }
  }

  async getMyUserIdOrThrow() {
    const session = await this.getMySession()
    if (!session) {
      throw new Error('Session is not found')
    }
    return session.user.id
  }
}

export const authService = new AuthService(authOptions)


