import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckBox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  searchQuery, setSearchQuery, isCheckboxChecked, setIsCheckboxChecked,
  handleSearchFormSubmit
  }) {

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/movies') {
      if (localStorage.getItem('savedQuery')) {
        setSearchQuery(localStorage.getItem('savedQuery'))
      }
    } else {
      setSearchQuery('')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchFormSubmit(e)
  }

  return (
    <div className="search-form">
      <form
        className="search-form__form"
        type="submit"
        onSubmit={ handleSubmit }
      >
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          value={ searchQuery }
          onChange={ (e) => {
            setSearchQuery(e.target.value);
          } }
        />
        <button
          className="search-form__button"
          type="submit"
        >
          Поиск
        </button>
      </form>
      <FilterCheckBox
        isCheckboxChecked ={ isCheckboxChecked }
        setIsCheckboxChecked={ setIsCheckboxChecked }
      />
    </div>
  )
}

export default SearchForm;