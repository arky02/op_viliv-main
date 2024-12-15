import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@core/models'
import { NextAuthConfig } from 'next-auth'
import KakaoProvider, {
  KakaoProfile
} from 'next-auth/providers/kakao'

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    KakaoProvider<KakaoProfile>({
      clientId: process.env.OAUTH_KAKAO_CLIENT_ID,
      clientSecret: process.env.OAUTH_KAKAO_CLIENT_SECRET,
      profile(profile) {
        console.log('profile', profile)
        const rawPhoneNumber =
          profile.kakao_account?.phone_number
        let formattedPhoneNumber = rawPhoneNumber

        if (rawPhoneNumber) {
          formattedPhoneNumber = rawPhoneNumber
            .replace(/^(\+82|82)\s?0?/, '0')
            .replace(/[-\s]/g, '')
        }

        return {
          id: String(profile.id),
          name: profile.kakao_account?.profile?.nickname,
          email: profile.kakao_account?.email,
          phoneNumber: formattedPhoneNumber,
          image:
            profile.kakao_account?.profile?.profile_image_url
        }
      }
    })
  ],
  cookies: {
    // sessionToken: {
    //   name: `__Secure-next-auth.session-token`,
    //   options: {
    //     httpOnly: true,
    //     sameSite: "Lax",
    //     path: "/",
    //     secure: process.env.NODE_ENV === "production",
    //   },
    // },
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (!session?.user) session

      if (token.sub) {
        session.user.id = token.sub
      }

      return session
    }
  }
}

export { authOptions }

