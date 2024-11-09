import styles from "./CountryItem.module.css";

interface CountryItemProps {
  country: string;
  emoji: string;
}

function CountryItem({ country, emoji }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
