import React, { useState } from 'react';
import './SearchBar.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform the search using the search term
  };

  return (
    <div className='searchBarComponent'>
        <form onSubmit={handleSearchSubmit}>
        <input type="text" placeholder='Search' value={searchTerm} onChange={handleSearchInput} className = 'searchBar'/>
        <button type="submit" className='searchButton'>Search</button>
        </form>
    </div>
  );
}

export default SearchBar;
