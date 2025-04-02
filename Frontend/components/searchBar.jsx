// components/SearchBar.jsx
import React from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({
  searchTerm,
  suggestions,
  onInputChange,
  onSelectSuggestion,
  onKeyDown
}) => {
  return (
    <div className="mt-6 w-full max-w-md relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search hair salons"
          className="w-full p-4 pl-10 rounded-full border-none text-black"
          value={searchTerm}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <span className="absolute left-3 top-4 text-gray-400">🔍</span>
      </div>

      {suggestions.length > 0 && (
        <div className="absolute w-full bg-white shadow-md rounded-lg mt-1 z-10">
          {suggestions.map((service, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-200 cursor-pointer"
              onClick={() => onSelectSuggestion(service)}
            >
              {service}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
