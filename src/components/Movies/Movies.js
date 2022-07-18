import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";

function Movies({
  filteredMovies, isLoading, searchQuery, setSearchQuery, isMoviesFound,
  isCheckboxChecked, setIsCheckboxChecked, handleSaveMovie, handleDeleteMovie, savedMoviesData, handleMoviesSearchFormSubmit
  }) {


  return (
    <section className="movies">
      <SearchForm
        searchQuery={ searchQuery }
        setSearchQuery={ setSearchQuery }
        isCheckboxChecked={ isCheckboxChecked }
        setIsCheckboxChecked={ setIsCheckboxChecked }
        handleSearchFormSubmit={ handleMoviesSearchFormSubmit }
      />
      <MoviesCardList
        moviesData={ filteredMovies }
        isLoading={ isLoading }
        handleSaveMovie={ handleSaveMovie }
        handleDeleteMovie={handleDeleteMovie}
        savedMoviesData={ savedMoviesData }
        isMoviesFound={ isMoviesFound }
        />
    </section>
  )
}

export default Movies;
