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
