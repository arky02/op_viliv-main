'use client'

import { SocialLoginButton } from '@design-system/template'
import { useAuth } from '@providers/auth/auth-react'

export function LoginButton() {
	const { signIn } = useAuth()

	const handleLogin = async () => {
		await signIn('kakao', {
			callbackUrl: '/academy'
		})
	}

	return (
		<div>
			<SocialLoginButton
				onClick={handleLogin}
				provider="kakao"
			>
				카카오로 로그인
			</SocialLoginButton>
		</div>
	)
}
