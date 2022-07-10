import React from 'react';
import { filterMovies } from '../../utils/filterMovies';
import moviesApi from '../../utils/MoviesApi';
import FilterCheckBox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ 
  setMovies, setFilteredMovies, setIsInfoTooltipOpen, setInfoTooltipText, setIsLoading, 
  searchQuery, setSearchQuery, isCheckboxChecked, setIsCheckboxChecked 
  }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    moviesApi.getBeatfilmMovies()
    .then((res) => {
      setMovies(res);
      const filtrationResult = filterMovies(res, searchQuery, isCheckboxChecked);
      if (searchQuery.length < 1) {
        setIsInfoTooltipOpen(true);
        setInfoTooltipText('Нужно ввести ключевое слово')
      } else {
        setFilteredMovies(filtrationResult);
        localStorage.setItem('filtrationResult', JSON.stringify(filtrationResult));
        localStorage.setItem('savedQuery', searchQuery);
        localStorage.setItem('checkboxState', JSON.stringify(isCheckboxChecked));
        console.log(localStorage);
        setIsLoading(false);
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      setIsLoading(false);
    })
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