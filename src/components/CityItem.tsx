import { City } from "./types";
import styles from "./CityItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCityContext } from "../context/CityContext";

const CityItem = ({ city }: { city: City }) => {
  const { formatDate, currentCity, deleteCity } = useCityContext();
  const navigate = useNavigate();
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;
  console.log(city);

  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this city?")) {
      await deleteCity(id);
      navigate("/app");
    }
  }

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
        <time className={styles.date}>{formatDate(new Date(date))}</time>
        <button
          className={styles.deleteBtn}
          onClick={() => handleDelete(id as number)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
