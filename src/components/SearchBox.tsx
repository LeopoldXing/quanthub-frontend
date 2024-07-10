import React from "react";

interface SearchBoxProps {
  handleKeywordChange: (keyword: string) => void;
  handleSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ handleKeywordChange, handleSearch }) => {
  return (
      <div className="w-full h-12 mt-16 pb-1 flex justify-between items-center border-b border-gray-300">
        <input
            type="text"
            placeholder="search articles / titles / authors"
            onChange={(e) => handleKeywordChange(e.target.value)}
            className="w-full h-12 text-lg border-none bg-transparent placeholder:font-thin focus:outline-none"
        />
        <button id="search-button" onClick={handleSearch}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 text-gray-300 duration-200 hover:scale-110"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="10" cy="10" r="7"/>
            <line x1="21" y1="21" x2="15" y2="15"/>
          </svg>
        </button>
      </div>
  );
};

export default SearchBox;
