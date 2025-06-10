import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchField = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="searchField searchField2">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="outline-none"
      />
    </div>
  );
};

export default SearchField;
