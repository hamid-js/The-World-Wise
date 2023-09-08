import { Link, useSearchParams } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const {  currentCity, deleteCity } = useCities();



  function deleteHandler (e) {
    e.preventDefault() 
    deleteCity(id)
  }

  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link to={`${id}?lat=${position.lat}&lag=${position.lng}`} className={`${styles.cityItem} ${id === currentCity.id  ? styles["cityItem--active"] : "" }`}>
        <span className={styles.emoji}> {emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}> ({formatDate(date)}) </time>
      <button onClick={deleteHandler} className={styles.deleteBtn}>&times;</button>
      </Link>
    </li> 
  );
}

export default CityItem;
