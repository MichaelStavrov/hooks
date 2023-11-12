import { useEffect, useRef, useState } from 'react';

const useHover = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const elem = ref.current;

    const onHover = () => setHovered(true);
    const onLeave = () => setHovered(false);

    elem?.addEventListener('mouseover', onHover);
    elem?.addEventListener('mouseleave', onLeave);

    return () => {
      elem?.removeEventListener('mouseover', onHover);
      elem?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return {
    hovered,
    ref,
  };
};

export default useHover;
