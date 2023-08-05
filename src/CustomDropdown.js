import React, { useState } from "react";

const CustomSelect = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const onChange = (selectedOptions) => {
    console.log("Selected Options:", selectedOptions);
  };

  const multiSelect = true;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (multiSelect) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
    }

    if (onChange) {
      onChange(multiSelect ? [...selectedOptions, option] : option);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedOptions = [...options].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  });

  const filteredOptions = sortedOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createSetOfTwo = (arr) => {
    const setOfTwo = [];
    for (let i = 0; i < arr.length; i = i + 2) {
      const arraySet = [];
      arr[i] && arraySet.push(arr[i]);
      arr[i + 1] && arraySet.push(arr[i + 1]);
      setOfTwo.push(arraySet);
    }
    return setOfTwo;
  };

  const groupedOptions = createSetOfTwo(filteredOptions);
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          cursor: "pointer",
        }}
        onClick={toggleDropdown}
      >
        {multiSelect
          ? selectedOptions.join(", ") || "Select options"
          : selectedOptions[0] || "Select an option"}
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {multiSelect && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search options..."
              style={{ width: "100%", padding: "8px" }}
            />
          )}
          <label>
            Sort Order:
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
          {groupedOptions.map((option, index) => (
            <React.Fragment key={index}>
              <div style={{ padding: "8px", fontWeight: "bold" }}>
                Group {index + 1}
              </div>
              {option.map((optionVal) => {
                return (
                  <div
                    key={optionVal}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      backgroundColor: selectedOptions.includes(optionVal)
                        ? "#e4e4e4"
                        : "transparent",
                    }}
                    onClick={() => handleOptionClick(optionVal)}
                  >
                    {optionVal}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
