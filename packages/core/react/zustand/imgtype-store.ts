import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const StorageKey = 'img-type'

interface ImgTypeProps {
	type: null | 'default' | 'person_removed' | 'white_ver_dir',
	setType: (type: ImgTypeProps['type']) => void
}

const useImgTypeStore = create(
  persist<ImgTypeProps>(
    (set) => {
			const getInitImgType = localStorage.getItem(StorageKey) as ImgTypeProps['type']; 
			return ({
				type: typeof getInitImgType === 'string' ? getInitImgType : null,
				setType: (type: ImgTypeProps['type']) => {
					set({ type });
				},
			})
		},
    {
      name: StorageKey, 
    },
  ),
);

export const useImgTypeState = () => 
	useImgTypeStore((state) => state.type);

export const useImgTypeStateAction = () =>
	useImgTypeStore((state) => state.setType);
