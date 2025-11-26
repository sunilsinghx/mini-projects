import type React from "react";
import { useState } from "react";

type Props = {
  onSearch: (city: string) => void;
  defaultCity?: string;
};

const SearchBar: React.FC<Props> = ({ onSearch, defaultCity }) => {
  const [city, setCity] = useState(defaultCity || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city.trim());
  };

  return (
    <div className="w-full flex justify-center mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-white shadow-md border border-gray-200 p-4 rounded-xl"
      >
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-56 text-gray-700"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
