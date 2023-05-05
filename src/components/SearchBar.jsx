import { useRef } from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
}) => {
  const searchInputRef = useRef();
  const handleChange = (e) => {
    setSearchQuery(searchInputRef.current.value);
    setCurrentPage(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchQuery(searchInputRef.current.value);
    setCurrentPage(0);
  };
  return (
    <form className="content" onSubmit={handleSubmit} onChange={handleChange}>
      <label htmlFor="search"></label>
      <input
        //   value={searchQuery}
        //   onInput={(e) => setSearchQuery(e.target.value)}
        ref={searchInputRef}
        type="text"
        id="search"
        placeholder="Search..."
        name="search"
        className="rounded-l-md  border-gray-200 border-[1px] w-[280px] text-gray-500 py-[0.4rem]  pl-[1rem] text-[1rem] focus:border focus:border-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-[#316EFF] text-gray-100 text-[1rem] py-[0.43em] px-[0.5rem] rounded-r-md">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
