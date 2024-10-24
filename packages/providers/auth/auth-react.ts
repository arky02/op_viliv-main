import {
	signIn,
	signOut,
	useSession
} from 'next-auth/react'

export const useAuth = () => {
	const { data: session, status } = useSession()

	const isAuthenticated = status === 'authenticated'
	const isUnauthenticated = status === 'unauthenticated'

	return {
		session,
		status,
		isAuthenticated,
		isUnauthenticated,
		signIn,
		signOut
	}
}
