import {useEffect, useState} from "react";
import {get} from "../utilities/api";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;
    (async() => {
      setIsLoading(true);
      const result = await get<T>(url, false);
      setData(result);
      setIsLoading(false);
    })();
  }, [url]);

  return {data, isLoading};
}