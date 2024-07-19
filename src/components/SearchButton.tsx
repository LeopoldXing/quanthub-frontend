const SearchButton = () => {
  return (
      <button type="submit">
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
  );
};

export default SearchButton;
