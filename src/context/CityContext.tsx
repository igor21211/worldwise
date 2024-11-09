import { createContext, useContext, useEffect, useState } from "react";
import { City } from "../components/types";

const BASE_URL = "http://localhost:9000";

const CityContext = createContext<{
  cities: City[];
  isLoading: boolean;
  getCity: (id: number) => Promise<City | undefined>;
  formatDate: (date: string | null) => string;
  currentCity: City | null;
}>({
  cities: [],
  isLoading: false,
  getCity: () => Promise.resolve(undefined),
  formatDate: () => "",
  currentCity: null,
});

function CityProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  async function getCity(id: number) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const formatDate = (date: string | null) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date || ""));

  return (
    <CityContext.Provider
      value={{ cities, isLoading, getCity, formatDate, currentCity }}
    >
      {children}
    </CityContext.Provider>
  );
}

export const useCityContext = () => {
  if (!CityContext) {
    throw new Error("useCityContext must be used within a CityProvider");
  }
  return useContext(CityContext);
};

export default CityProvider;
