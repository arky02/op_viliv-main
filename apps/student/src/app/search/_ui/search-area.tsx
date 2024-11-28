'use client'

import { Button, Input, toast } from '@design-system/ui'
import { useState } from 'react'
import { useAction } from '@core/react'
import { searchAcademiesAction } from '@/module/academy/action'
import { type GetAcademies } from '@/module/academy/model'
import { type GetMyUserInfo } from '@/module/user/model'
import { SearchEmpty } from './search-empty'
import { AcademySearchCard } from './academy-search-card'

interface SearchAreaProps {
	userInfo: GetMyUserInfo
}

export function SearchArea({
	userInfo
}: SearchAreaProps): JSX.Element {
	const [keyword, setKeyword] = useState('')
	const [results, setResults] = useState<GetAcademies[]>([])

	const handleKeywordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setKeyword(e.target.value)
	}

	const searchAcademies = useAction(searchAcademiesAction, {
		onSuccess: (response) => {
			setResults(response.data ?? []) // undefined인 경우 빈 배열로 설정
		},
		onError: (error) => {
			toast({
				title: '검색 실패',
				variant: 'negative'
			})
			console.error(error)
		}
	})

	const handleSearchAcademies = () => {
		const trimmedKeyword = keyword.trim()
		if (trimmedKeyword === '') {
			toast({
				title: '검색어를 입력해 주세요',
				variant: 'negative'
			})
			return
		}

		searchAcademies.execute(trimmedKeyword)
	}

	// 엔터 키로 검색할 수 있도록 핸들러 추가
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
			handleSearchAcademies()
		}
	}

	return (
		<div className="pc:px-[120px] flex flex-col p-4">
			<div className="pc:py-10 flex gap-2">
				<Input
					placeholder="기관 이름으로 검색해 보세요"
					className="flex-1"
					value={keyword}
					onChange={handleKeywordChange}
					onKeyDown={handleKeyDown}
				/>
				<Button onClick={handleSearchAcademies}>
					검색하기
				</Button>
			</div>

			{results.length === 0 ? (
				<SearchEmpty />
			) : (
				<div className="pc:grid-cols-2 pc:gap-4 max-pc:py-4 grid grid-cols-1 gap-3">
					{results.map((academy) => (
						<AcademySearchCard
							key={academy.id}
							academy={academy}
							userInfo={userInfo}
						/>
					))}
				</div>
			)}
		</div>
	)
}
