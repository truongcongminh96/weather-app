import React from "react";
import styles from "./TemperatureFilter.module.css";

interface TempFilterProps {
  onFilter: (temp: number) => void;
}

export const TempFilter: React.FC<TempFilterProps> = ({ onFilter }) => {
  const [value, setValue] = React.useState(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempValue = Number(e.target.value);
    setValue(tempValue);
    onFilter(tempValue);
  };

  return (
    <div className={styles.tempFilterContainer}>
      <label htmlFor="temp-slider" className={styles.tempFilterLabel}>Warmer than: {value}°C</label>
      <input
        id="temp-slider"
        type="range"
        min="-50"
        max="50"
        step="1"
        value={value}
        onChange={handleSliderChange}
        className={styles.tempSlider}
      />
    </div>
  );
};
