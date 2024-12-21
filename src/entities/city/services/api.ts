import { BASE_URL, API_KEY } from "../../../shared/config/api";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
  pollution: {
    pm10: number;
  };
}

export const fetchCityWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return {
      name: data.name,
      main: {
        temp: data.main.temp,
      },
      weather: data.weather.map((item: { description: string }) => ({
        description: item.description,
      })),
      wind: {
        speed: data.wind.speed,
      },
      pollution: {
        pm10: Math.floor(Math.random() * 150),
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};