import SearchIcon from "./Icons/searchIcon";

const SearchBox = () => {
  return (
    <div className="p-2">
      <label
        className="w-96 px-3 py-2 border border-blue-400 rounded-full flex items-center
                   bg-white shadow-sm
                   hover:border-blue-500 hover:shadow-md
                   focus-within:border-blue-600 focus-within:ring-2 
                   focus-within:ring-blue-300 transition-all duration-200"
      >
        <SearchIcon fill={"#2563EB"} /> 
        <input
          className="w-full ml-3 text-blue-700 bg-transparent outline-none 
                     caret-blue-600 placeholder:text-blue-300 
                     placeholder:font-medium placeholder:italic truncate
                     focus:placeholder:text-blue-400"
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
        />
      </label>
    </div>
  );
};

export default SearchBox;
