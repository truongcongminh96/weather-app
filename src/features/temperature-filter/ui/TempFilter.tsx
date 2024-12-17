import React from "react";

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
