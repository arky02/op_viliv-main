import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const StorageKey = 'img-type';

interface ImgTypeProps {
  type: 'default' | 'person_removed' | 'white_ver_dir' | '';
  setType: (type: ImgTypeProps['type']) => void;
}

// Zustand Store
const useImgTypeStore = create(
  persist<ImgTypeProps>(
    (set) =>  ({
      type: '',
      setType: (type: ImgTypeProps['type']) => {
        set({ type });
      }
    }),
    {
      name: StorageKey, 
    }
  )
);

export const useImgTypeState = () =>
  useImgTypeStore((state) => state.type);


export const useImgTypeStateAction = () =>
  useImgTypeStore((state) => state.setType);
