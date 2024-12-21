import React, { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    } 
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        className={styles.searchInput}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        aria-label="Search"
      >
        🔍
      </button>
    </div>
  );
};
