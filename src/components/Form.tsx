// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCityContext } from "../context/CityContext";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const { lat, lng } = useUrlPosition();

  const [cityName, setCityName] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { addCity, isLoading } = useCityContext();

  useEffect(() => {
    if (!lat || !lng) {
      setErrorMsg("No location found");
      return;
    }
    async function fetchCityName() {
      try {
        setIsLoadingGeocoding(true);
        setErrorMsg("");
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        if (!data.city) {
          throw new Error("City not found");
        }
        setCountry(data.countryName);
        setCityName(data.city);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error(error);
        setErrorMsg("City not found");
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityName();
  }, [lat, lng]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };
    await addCity(newCity);
    navigate("/app");
  }
  if (errorMsg) return <Message message={errorMsg} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      {isLoadingGeocoding && <Spinner />}
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          className={styles.cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => {
            if (date) setDate(date);
          }}
          selected={date}
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
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
    </form>
  );
}

export default Form;
