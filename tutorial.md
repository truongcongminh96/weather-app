src/
├── app/
│   ├── App.tsx                 # Thành phần chính của ứng dụng
│   ├── main.tsx                # Entry point (ReactDOM render)
│   └── providers/              # Các providers tập trung ở đây
│       └── AppProvider.tsx     # Global providers (Context API, Theme)
│
├── assets/                     # Tài nguyên tĩnh (ảnh, icons)
│
├── entities/                   # Các thực thể cốt lõi
│   └── city/                   # Thực thể "City"
│       ├── model.ts            # Kiểu dữ liệu và model
│       └── services/           # API gọi dữ liệu thời tiết
│           └── api.ts          # Tích hợp OpenWeatherMap API
│
├── features/                   # Các tính năng chính
│   ├── search-bar/             # Tính năng tìm kiếm thành phố
│   │   ├── ui/                 # Giao diện UI
│   │   │   └── SearchBar.tsx
│   │   └── model.ts            # Logic tìm kiếm
│   │
│   ├── temp-filter/            # Tính năng lọc nhiệt độ
│   │   ├── ui/                 # Giao diện UI
│   │   │   └── TempFilter.tsx
│   │   └── model.ts            # Logic lọc nhiệt độ
│
├── pages/                      # Các màn hình chính của app
│   └── Home/                   # Trang Home
│       ├── Home.tsx            # Thành phần Home
│       └── index.ts            # Export màn hình Home
│
├── shared/                     # Tài nguyên dùng chung
│   ├── styles/                 # CSS/SCSS dùng chung
│   │   └── index.css
│   ├── ui/                     # Các component tái sử dụng
│   │   └── Button.tsx
│   └── config/                 # Cấu hình toàn cục
│       └── api.ts              # API key và base URL
│
└── vite-env.d.ts               # Type declarations của Vite



Rất vui khi được đồng hành cùng bạn! 🚀
Dưới đây là hướng dẫn chi tiết từ đầu đến cuối để bạn hoàn thành bài assignment Weather App theo yêu cầu, sử dụng React + TypeScript và FSD (Feature-Sliced Design).

1. Khởi tạo dự án React + TypeScript
   Tạo một dự án Vite với React và TypeScript:

bash
Copy code
npm create vite@latest weather-app --template react-ts
cd weather-app
npm install
2. Cấu trúc thư mục theo FSD
   Xây dựng cấu trúc dự án như sau:

python
Copy code
src/
├── app/                 
│   ├── App.tsx                # Thành phần chính của ứng dụng
│   ├── main.tsx               # Entry point
│   └── providers/             # Providers dùng chung
│       └── AppProvider.tsx
│
├── entities/                 
│   └── city/                  # Thực thể City
│       ├── model.ts           # Kiểu dữ liệu của City
│       └── services/          # API gọi dữ liệu từ OpenWeatherMap
│           └── api.ts
│
├── features/                 
│   ├── search-bar/            # Tính năng tìm kiếm thành phố
│   │   ├── ui/                # Giao diện tìm kiếm
│   │   │   └── SearchBar.tsx
│   │   └── model.ts           # Logic tìm kiếm
│   │
│   ├── temp-filter/           # Tính năng lọc nhiệt độ
│   │   ├── ui/                # Giao diện lọc nhiệt độ
│   │   │   └── TempFilter.tsx
│   │   └── model.ts           # Logic lọc
│
├── pages/                    
│   └── Home/                  # Màn hình chính
│       ├── Home.tsx
│       └── index.ts
│
├── shared/                   
│   ├── styles/                # Global styles
│   │   └── index.css
│   ├── ui/                    # Các components tái sử dụng
│   │   └── Button.tsx
│   └── config/                # Cấu hình API
│       └── api.ts
│
└── vite-env.d.ts              # Type declarations cho Vite
3. Cấu hình AppProvider
   Tạo AppProvider để bọc các providers toàn cục (ví dụ: quản lý trạng thái thời tiết):

src/app/providers/AppProvider.tsx

tsx
Copy code
import React, { ReactNode } from 'react';

interface AppProviderProps {
children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
return <>{children}</>;
};
4. Gọi API từ OpenWeatherMap
   Đăng ký tài khoản trên OpenWeatherMap và lấy API Key.

Tạo cấu hình API:

src/shared/config/api.ts

ts
Copy code
export const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
export const API_KEY = 'your_api_key_here'; // Thay bằng API Key của bạn
Tạo file gọi API trong entities/city/services/api.ts:

ts
Copy code
import { BASE_URL, API_KEY } from '@/shared/config/api';

export const fetchCityWeather = async (city: string) => {
const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
if (!response.ok) {
throw new Error('Không thể lấy dữ liệu thời tiết');
}
return response.json();
};
5. Xây dựng tính năng tìm kiếm thành phố
   features/search-bar/ui/SearchBar.tsx

tsx
Copy code
import React, { useState } from 'react';

interface SearchBarProps {
onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
const [query, setQuery] = useState('');

const handleSearch = () => {
if (query.trim()) {
onSearch(query);
}
};

return (
<div>
<input
type="text"
placeholder="Nhập tên thành phố..."
value={query}
onChange={(e) => setQuery(e.target.value)}
/>
<button onClick={handleSearch}>Tìm kiếm</button>
</div>
);
};
6. Xây dựng tính năng lọc nhiệt độ
   features/temp-filter/ui/TempFilter.tsx

tsx
Copy code
interface TempFilterProps {
onFilter: (temp: number) => void;
}

export const TempFilter: React.FC<TempFilterProps> = ({ onFilter }) => {
return (
<div>
<input
type="number"
placeholder="Lọc theo nhiệt độ..."
onChange={(e) => onFilter(Number(e.target.value))}
/>
</div>
);
};
7. Xây dựng trang Home
   pages/Home/Home.tsx

tsx
Copy code
import React, { useState } from 'react';
import { fetchCityWeather } from '@/entities/city/services/api';
import { SearchBar } from '@/features/search-bar/ui/SearchBar';
import { TempFilter } from '@/features/temp-filter/ui/TempFilter';

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
8. Cập nhật App.tsx
   src/app/App.tsx

tsx
Copy code
import React from 'react';
import { Home } from '@/pages/Home/Home';

const App: React.FC = () => {
return <Home />;
};

export default App;
9. Chạy ứng dụng
   Chạy lệnh sau để khởi động dự án:

bash
Copy code
npm run dev
Mở http://localhost:5173 và kiểm tra ứng dụng.

10. Kết luận
    Bạn đã hoàn thành:

Cấu trúc dự án theo FSD.
Tính năng tìm kiếm và lọc nhiệt độ.
Tích hợp API từ OpenWeatherMap.
Xây dựng giao diện đơn giản và sạch.
Hãy commit code lên GitHub và đảm bảo có README.md hướng dẫn setup dự án.

Nếu bạn gặp bất kỳ khó khăn nào, đừng ngần ngại hỏi nhé! Chúc bạn thành công!