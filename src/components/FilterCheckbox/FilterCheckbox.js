import React from 'react';

function FilterCheckBox({ isCheckboxChecked, setIsCheckboxChecked }) {

  const handleFilterSubmit = (e) => {
    setIsCheckboxChecked(e.target.checked);
  }

  return (
    <label className="filter-checkbox" htmlFor="saved">
      <input 
        className="filter-checkbox__input" 
        type="checkbox" 
        id="saved" 
        onInput={ handleFilterSubmit }
        value={ isCheckboxChecked }
        defaultChecked={ isCheckboxChecked }
      />
      <span className="filter-checkbox__switch"></span>
      <p className="filter-checkbox__text">Короткометражки</p>
    </label>
  )
}

export default FilterCheckBox;