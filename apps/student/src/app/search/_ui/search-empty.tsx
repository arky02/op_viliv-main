import { Icon } from '@design-system/icon'

export function SearchEmpty() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-10">
			<div className="text-muted-foreground flex flex-col items-center justify-center gap-6">
				<Icon
					name="SearchEyeLine"
					className="text-muted-foreground h-[60px] w-[60px]"
				/>
				<div className="flex flex-col items-center justify-center gap-1">
					<div className="text-lg">검색 결과가 없어요</div>
					<div className="text-sm">
						다른 키워드로 검색해 보시겠어요?
					</div>
				</div>
			</div>
		</div>
	)
}
