import classes from "./filter.module.css";
import { useState, useEffect } from "react";

function Filter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(`.${classes.filterSelector}`)) {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(option);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className={classes.filterSelector}>
      <div className={classes.filterDropDownWrapper}>
        <div className={classes.filterDropDown} onClick={toggleDropdown}>
          {selectedOption ? selectedOption : "Filter"}
        </div>
        {isOpen && (
          <div className={classes.filterContent}>
            <div className={classes.all} onClick={() => handleOptionClick("All")}>
              All
            </div>
            <div className={classes.romance} onClick={() => handleOptionClick("Romance")}>
              Romance
            </div>
            <div className={classes.horror} onClick={() => handleOptionClick("Horror")}>
              Horror
            </div>
            <div className={classes.literature} onClick={() => handleOptionClick("Literature")}>
              Literature
            </div>
            <div className={classes.history} onClick={() => handleOptionClick("History")}>
              History
            </div>
            <div className={classes.science} onClick={() => handleOptionClick("Science")}>
              Science
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
