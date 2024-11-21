import { useState, useEffect } from 'react';


// zustand persist 함수의 server side hydration 에러 해결을 위한 useStore 함수
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};