import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

type Params = Record<string, string | number>;

interface RefetchProps {
  params: Params;
}

const fetchData = async (url: string, params?: Params) => {
  const res = await axios(url, { params });

  return res.data;
};

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | unknown>();

  const request = useCallback(
    async (params?: Params) => {
      setIsLoading(true);

      try {
        const res = await fetchData(url, params);
        setData(res);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    request();
  }, [request]);

  const refetch = ({ params }: RefetchProps) => {
    request(params);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useFetch;
