import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCityContext } from "../context/CityContext";
import { useEffect } from "react";
import Button from "./Button";

function City() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCity, isLoading, formatDate, currentCity } = useCityContext();
  useEffect(() => {
    getCity(id ? parseInt(id) : 0);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;
  if (!currentCity) return <Message message="City not found" />;

  const { cityName, emoji, date, notes } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
