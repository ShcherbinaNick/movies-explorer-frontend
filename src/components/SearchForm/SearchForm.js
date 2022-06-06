import React from 'react';
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <div className="search-form">
      <form className="search-form__form" type="submit">
        <input className="search-form__input" type="text" placeholder="Фильм" required />
        <button className="search-form__button" type="submit">Поиск</button>
      </form>
      <FilterCheckBox />
    </div>
  )
}

export default SearchForm;