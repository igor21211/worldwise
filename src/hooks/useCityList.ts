import { useEffect, useState } from "react";
import { City } from "../components/types";

export default function useCityList() {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:9000/cities")
      .then((res) => res.json())
      .then((data: City[]) => {
        setCities(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return { cities, isLoading };
}

export function useCity(id: string) {
  const [city, setCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`http://localhost:9000/cities/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data: City) => {
        setCity(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return { city, isLoading, error };
}
