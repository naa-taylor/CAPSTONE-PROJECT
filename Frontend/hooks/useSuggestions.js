import { useState } from "react";

const useSuggestions = (serviceList) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 0) {
      const filtered = serviceList.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return {
    searchTerm,
    suggestions,
    setSearchTerm,
    setSuggestions,
    handleInputChange,
  };
};

export default useSuggestions;