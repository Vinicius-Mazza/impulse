import useSWR from "swr";

interface FetchDataResponse<T> {
  data: T | null | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useFetchData = <T>(
  url: string,
  options?: RequestInit
): FetchDataResponse<T> => {
  const fetcher = (url: string) =>
    fetch(url, options).then((res) => res.json());

  const { data, error } = useSWR<T>(url, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (retryCount >= 3) return;

      const delay = Math.pow(2, retryCount) * 1000;
      setTimeout(() => revalidate({ retryCount }), delay);
    },
  });

  return {
    data: error ? null : data,
    isLoading: !error && !data,
    error,
  };
};
