import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";

function Movies({
  moviesData, setMovies, setFilteredMovies, filteredMovies, setIsInfoTooltipOpen, 
  setInfoTooltipText, isLoading, setIsLoading, searchQuery, setSearchQuery,
  isCheckboxChecked, setIsCheckboxChecked
  }) {
  return (
    <section className="movies">
      <SearchForm
        setMovies={ setMovies }
        moviesData={ moviesData }
        setFilteredMovies={ setFilteredMovies }
        setIsInfoTooltipOpen={ setIsInfoTooltipOpen }
        setInfoTooltipText={ setInfoTooltipText }
        setIsLoading={ setIsLoading }
        searchQuery={ searchQuery }
        setSearchQuery={ setSearchQuery }
        isCheckboxChecked={ isCheckboxChecked }
        setIsCheckboxChecked={ setIsCheckboxChecked }
      />
      <MoviesCardList
        moviesData={ filteredMovies }
        isLoading={ isLoading }
        />
    </section>
  )
}

export default Movies;