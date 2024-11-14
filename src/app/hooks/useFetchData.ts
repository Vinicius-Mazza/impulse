import { useState, useEffect } from "react";

interface FetchDataResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export const useFetchData = <T>(
  url: string,
  options?: RequestInit,
  searchParams?: string
): FetchDataResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fullUrl = `${url}?${searchParams}`;
        const response = await fetch(fullUrl, options);
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options, searchParams]);

  return { data, isLoading, error };
};
