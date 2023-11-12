import { useEffect, useState } from 'react';

type FnReturnType = [
  string | null,
  {
    setItem: (value: string) => void;
    removeItem: () => void;
  }
];

const getFromStorage = (key: string) => localStorage.getItem(key);

const useLocalStorage = (key: string): FnReturnType => {
  const [value, setValue] = useState(getFromStorage(key));

  const setItem = (newValue: string) => {
    localStorage.setItem(key, newValue);

    setValue(getFromStorage(key));
  };

  const removeItem = () => {
    localStorage.removeItem(key);

    setValue(null);
  };

  return [
    value,
    {
      setItem,
      removeItem,
    },
  ];
};

export default useLocalStorage;
