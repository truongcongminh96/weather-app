import React, { useState } from 'react';
import { fetchCityWeather } from '../../entities/city/services/api';
import { SearchBar } from '../../features/search-bar/ui/SearchBar';
import { TempFilter } from '../../features/temperature-filter/ui/TempFilter';

interface CityWeather {
    name: string;
    main: { temp: number };
    weather: { description: string }[];
}

export const Home: React.FC = () => {
    const [cities, setCities] = useState<CityWeather[]>([]);
    const [filterTemp, setFilterTemp] = useState<number | null>(null);

    const handleSearch = async (city: string) => {
        try {
            const data = await fetchCityWeather(city);
            setCities((prev) => [...prev, data]);
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
        <div>
            <h1>Weather App</h1>
            <SearchBar onSearch={handleSearch} />
            <TempFilter onFilter={handleFilter} />
            <ul>
                {filteredCities.map((city, index) => (
                    <li key={index}>
                        {city.name} - {city.main.temp}°C - {city.weather[0].description}
                    </li>
                ))}
            </ul>
        </div>
    );
};
