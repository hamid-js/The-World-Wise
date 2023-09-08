import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import {  useCities } from "../contexts/CitiesContext";
 
function CityList() {
  const { isLoading, cities } = useCities()
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message={"add your first city by ckiking on   a city on the map"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
