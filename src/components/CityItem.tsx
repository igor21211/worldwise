import { City } from "./types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCityContext } from "../context/CityContext";

const CityItem = ({ city }: { city: City }) => {
  const { formatDate, currentCity } = useCityContext();
  const {
    cityName,
    emoji,
    date,
    notes,
    id,
    position: { lat, lng },
  } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.cityName}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
