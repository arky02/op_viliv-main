import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
	const session = await authService.getMySession()
	if (!session) redirect('/start')
	redirect('/academy')
	return <></>
}
