import React, { useState } from "react";
import { fetchCityWeather } from "../../entities/city/services/api";
import { SearchBar } from "../../features/searchBar/ui/SearchBar";
import { TempFilter } from "../../features/temperatureFilter/ui/TemperatureFilter";
import styles from "./Home.module.css";

interface CityWeather {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
  wind: { speed: number };
  pollution: { pm10: number };
}

export const Home: React.FC = () => {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [filterTemp, setFilterTemp] = useState<number | null>(null);

  const handleSearch = async (city: string) => {
    try {
      const data = await fetchCityWeather(city);

      setCities((prev) => {
        const cityExists = prev.some(
          (item) => item.name.toLowerCase() === data.name.toLowerCase()
        );

        if (cityExists) {
          return prev.map((item) =>
            item.name.toLowerCase() === data.name.toLowerCase() ? data : item
          );
        }

        return [...prev, data];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = (temp: number) => {
    setFilterTemp(temp);
  };

  const filteredCities = filterTemp
    ? cities.filter((city) => city.main.temp >= filterTemp)
    : cities;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather App</h1>
      <div className={styles.filterContainer}>
        <SearchBar onSearch={handleSearch} />
        <TempFilter onFilter={handleFilter} />
      </div>
      <ul className={styles.gridContainer}>
        {filteredCities.map((city, index) => (
          <li key={index} className={styles.cityCard}>
            <button
              className={styles.removeButton}
              onClick={() => setCities(cities.filter((_, i) => i !== index))}
            >
              ❌
            </button>
            <div className={styles.cityContent}>
              <div className={styles.cityLeft}>
                <span>
                  {city.name}, {city.main.temp}°C
                </span>
              </div>
              <div className={styles.cityRight}>
                <span>PM10: {city.pollution.pm10}</span>
                <span>Wind: {city.wind.speed} m/s</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
