// PlaceTypeSelector.tsx
import React, { useState } from "react";
import placeTypes from "../app/api/placeTypes.json";

interface PlaceTypeSelectorProps {
  onSelectedTypesChange: (selectedTypes: string[]) => void;
}

const PlaceTypeSelector: React.FC<PlaceTypeSelectorProps> = ({
  onSelectedTypesChange,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedTypes(selectedOptions);
    onSelectedTypesChange(selectedOptions); // Call the callback function
  };

  return (
    <div>
      <h1>Select Place Types</h1>
      <div>Choose up to 5 different types only</div>
      <select multiple value={selectedTypes} onChange={handleChange}>
        {placeTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div>Selected Types: {selectedTypes.join(", ")}</div>
    </div>
  );
};

export default PlaceTypeSelector;
