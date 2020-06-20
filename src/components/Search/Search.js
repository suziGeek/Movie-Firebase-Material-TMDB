import React, { useState } from "react";

const Search = props => {
  const [searchValue, setSearchValue] = useState("");

  console.log(searchValue);

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    props.search(searchValue);
    resetInputField();
    e.preventDefault();
  };

  const isEnabled = searchValue.length > 0 && searchValue.length > 0;

  return (
    <form className='search'>
      <input
        required
        value={searchValue}
        onChange={handleSearchInputChanges}
        type='text'
        name='searchTerm'
        placeholder='Search For Movies'
      />
      <button
        disabled={!isEnabled}
        onClick={callSearchFunction}
        type='submit'
        value='SEARCH_VALUE'
        required
      >
        SEARCH
      </button>
    </form>
  );
};

export default Search;
