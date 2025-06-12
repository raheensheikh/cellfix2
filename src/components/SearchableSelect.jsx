import React from "react";
import Select from "react-select";

const SearchableSelect = ({ options, onChange, selectedOption, placeholder }) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "12px",
      borderColor: "#000",
      minHeight: "50px",
      color: "#000px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <Select
      options={options}
      onChange={onChange}
      value={selectedOption}
      placeholder={placeholder || "Select..."}
      styles={customStyles}
      className="select"
      isSearchable
    />
  );
};

export default SearchableSelect;
