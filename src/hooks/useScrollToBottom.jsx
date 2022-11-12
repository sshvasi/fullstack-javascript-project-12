import { useLayoutEffect, useRef } from 'react';

const useScrollToBottom = (...deps) => {
  const ref = useRef();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, deps);

  return ref;
};

export default useScrollToBottom;
