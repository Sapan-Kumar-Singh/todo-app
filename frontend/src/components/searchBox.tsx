import SearchIcon from "./Icons/searchIcon";


const SearchBox = () => {
  return (
    <div className="p-2">
      <label
        className="w-96 px-3 py-1 border  border-form-default rounded-full flex items-center bg-white   focus-within:shadow-sm">
        <SearchIcon className="w-4 h-4" fill={"#17173A"} /> 
        <input
          className="w-full ml-3 font-medium text-lightblack bg-transparent outline-none 
                     caret-form-default placeholder:text-lightgrey 
                     placeholder:font-medium placeholder:italic truncate "
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
