import {useEffect, useState} from "react";

const API = "https://pokeapi.co/api/v2/";


export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    fetch(`${API}${url}`)
    .then((response) => response.json())
    .then((json) => {
      setData(json);
      setIsLoading(false);
    })
    .catch(() => {
      setData(undefined);
      setIsLoading(false);
    });
  }, [url]);

  return {data, isLoading};
}