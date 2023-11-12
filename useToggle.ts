import { useEffect, useRef, useState } from 'react';

type ToggleValue<T> = T[] | T | boolean | undefined;

const useToggle = <T = string>(
  value?: ToggleValue<T>
): [ToggleValue<T>, (val?: T) => void] => {
  const isFirstRender = useRef(true);
  const count = useRef(0);
  const [toggleValue, setToggleValue] = useState<ToggleValue<T>>(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (Array.isArray(value)) {
        setToggleValue(value[0]);
        count.current += 1;
      } else if (typeof value !== 'undefined') {
        setToggleValue(value);
      }
    }
  }, [value]);

  const toggle = (val?: T) => {
    if (val) {
      setToggleValue(val);
    } else if (Array.isArray(value)) {
      setToggleValue(value[count.current]);

      if (count.current === value.length - 1) {
        count.current = 0;
      } else {
        count.current += 1;
      }
    } else if (typeof value === 'boolean' || value === undefined) {
      setToggleValue((prev) => !prev);
    }
  };

  return [toggleValue, toggle];
};

export default useToggle;
