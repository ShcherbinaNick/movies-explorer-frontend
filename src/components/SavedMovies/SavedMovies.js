import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  moviesData, isLoading, savedMoviesData, handleDeleteMovie, isSavedMoviesFound,
  searchQuery, setSearchQuery, isShortMoviesCheckboxChecked, setIsShortMoviesCheckboxChecked, handleSavedMoviesSearchFormSubmit,
  }) {

  return(
    <section className="saved-movies">
      <SearchForm
        searchQuery={ searchQuery }
        setSearchQuery={ setSearchQuery }
        isCheckboxChecked={ isShortMoviesCheckboxChecked }
        setIsCheckboxChecked={ setIsShortMoviesCheckboxChecked }
        handleSearchFormSubmit={ handleSavedMoviesSearchFormSubmit }
      />
      <MoviesCardList
        isOnSavedMoviesPage
        moviesData={ moviesData }
        isLoading={ isLoading }
        savedMoviesData={ savedMoviesData }
        handleDeleteMovie={ handleDeleteMovie }
        isMoviesFound={ isSavedMoviesFound }
      />
    </section>
  )
}

export default SavedMovies;
