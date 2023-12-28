import {useEffect, useState} from "react";

export const API = "https://pokeapi.co/api/v2/";

export async function get<T>(url: string) {
  try {
    const data = await fetch(url);
    const response: T = await data.json();

    return response;
  }
  catch (error: any) {
    console.log('error', error);
    return null;
  }
}

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;
    (async() => {
      setIsLoading(true);
      const result = await get<T>(`${API}${url}`);
      setData(result);
      setIsLoading(false);
    })();
  }, [url]);

  return {data, isLoading};
}