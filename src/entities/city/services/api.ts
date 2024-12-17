import {BASE_URL, API_KEY} from '../../../shared/config/api';

export const fetchCityWeather = async (city: string) => {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Could not get data weather');
    }
    return response.json();
};
