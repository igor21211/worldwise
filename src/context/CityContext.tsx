import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { City } from "../components/types";

const BASE_URL = "http://localhost:9000";

interface CityContextType {
  cities: City[];
  isLoading: boolean;
  getCity: (id: number) => Promise<City | undefined>;
  formatDate: (date: Date) => string;
  currentCity: City | null;
  addCity: (city: City) => Promise<City | undefined>;
  deleteCity: (id: number) => void;
}
interface State {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
}
type Action =
  | { type: "LOADING" }
  | { type: "CURRENT_CITY"; payload: City }
  | { type: "CITIES_LOADED"; payload: City[] }
  | { type: "CITY_ADDED"; payload: City }
  | { type: "CITY_DELETED"; payload: { id: number } }
  | { type: "REJECTED" };

const CityContext = createContext<CityContextType>({
  cities: [],
  isLoading: false,
  getCity: () => Promise.resolve(undefined),
  formatDate: () => "",
  currentCity: null,
  addCity: () => Promise.resolve(undefined),
  deleteCity: () => {},
});

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "CURRENT_CITY":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "CITIES_LOADED":
      return { ...state, cities: action.payload, isLoading: false };
    case "CITY_ADDED":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "CITY_DELETED":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload.id),
        isLoading: false,
      };
    case "REJECTED":
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

function CityProvider({ children }: { children: React.ReactNode }) {
  /*   const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<City | null>(null); */
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    //example of useReducer
    reducer,
    initialState
  );

  useEffect(() => {
    async function getCities() {
      try {
        dispatch({ type: "LOADING" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "CITIES_LOADED", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "REJECTED" });
      }
    }
    getCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: number) {
      if (Number(id) === currentCity?.id) {
        return;
      }
      try {
        dispatch({ type: "LOADING" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "CURRENT_CITY", payload: data });
        return data;
      } catch (err) {
        console.error(err);
        dispatch({ type: "REJECTED" });
      }
    },
    [currentCity?.id]
  );

  async function addCity(city: City) {
    try {
      dispatch({ type: "LOADING" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      dispatch({ type: "CITY_ADDED", payload: data });
      return data;
    } catch (err) {
      console.error(err);
      dispatch({ type: "REJECTED" });
    }
  }

  async function deleteCity(id: number) {
    try {
      dispatch({ type: "LOADING" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "CITY_DELETED", payload: { id } });
    } catch (err) {
      console.error(err);
      dispatch({ type: "REJECTED" });
    }
  }

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        formatDate,
        currentCity,
        addCity,
        deleteCity,
      }}
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
