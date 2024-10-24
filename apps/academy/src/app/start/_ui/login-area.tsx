import Image from 'next/image'
import LoginImage from '../../../lib/asset/logo/login-image.png'
import { LoginButton } from './login-button'

export function LoginArea() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-[60px]">
			<div className="flex flex-col gap-10">
				<Image
					src={LoginImage}
					alt="로그인 이미지"
					width={240}
					height={50}
				/>
				<div className="text-secondary-foreground flex flex-col items-center justify-center text-base">
					<div>간편하게 로그인하고</div>
					<div>빌리브를 이용해 보세요</div>
				</div>
			</div>
			<LoginButton />
		</div>
	)
}
