import { useEffect, useState } from 'react';

const useWindowEvent = (
  type: string,
  listener: EventListener,
  options?: EventListenerOptions
) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener(type, listener, options);

      return () => window.removeEventListener(type, listener, options);
    }
  }, [type, listener, options]);
};

const useViewportSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useWindowEvent('resize', () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return size;
};

export default useViewportSize;
