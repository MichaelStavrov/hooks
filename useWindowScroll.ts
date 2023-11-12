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

interface ScrollToProps {
  x?: number;
  y?: number;
}

type UseWindowScrollReturnType = [
  { x: number; y: number },
  (coord: ScrollToProps) => void
];

const useWindowScroll = (): UseWindowScrollReturnType => {
  const [scroll, setScroll] = useState({
    x: window.scrollX,
    y: window.scrollY,
  });

  useWindowEvent('scroll', () => {
    setScroll({ x: window.scrollX, y: window.scrollY });
  });

  const scrollTo = ({
    x = window.scrollX,
    y = window.scrollY,
  }: ScrollToProps) => {
    window.scrollTo(x, y);
  };

  return [scroll, scrollTo];
};

export default useWindowScroll;
