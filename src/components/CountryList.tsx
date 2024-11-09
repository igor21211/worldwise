import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCityContext } from "../context/CityContext";

const CountryList = () => {
  const { cities, isLoading } = useCityContext();

  const countries = cities.reduce<{ country: string; emoji: string }[]>(
    (arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji }];
      else return arr;
    },
    []
  );

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a country on the map" />
    );
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem
          key={country.country}
          country={country.country}
          emoji={country.emoji}
        />
      ))}
    </ul>
  );
};

export default CountryList;
