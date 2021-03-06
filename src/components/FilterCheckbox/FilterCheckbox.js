import React from 'react';

function FilterCheckBox() {
  return (
    <label className="filter-checkbox" htmlFor="saved">
      <input className="filter-checkbox__input" type="checkbox" id="saved" />
      <span className="filter-checkbox__switch"></span>
      <p className="filter-checkbox__text">Короткометражки</p>
    </label>
  )
}

export default FilterCheckBox;