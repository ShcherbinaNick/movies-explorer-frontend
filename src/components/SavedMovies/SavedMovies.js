import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  moviesData, isLoading, savedMoviesData, handleDeleteMovie,
  searchQuery, setSearchQuery, isCheckboxChecked, setIsCheckboxChecked, handleSavedMoviesSearchFormSubmit,
  }) {

  return(
    <section className="saved-movies">
      <SearchForm
        searchQuery={ searchQuery }
        setSearchQuery={ setSearchQuery }
        isCheckboxChecked={ isCheckboxChecked }
        setIsCheckboxChecked={ setIsCheckboxChecked }
        handleSearchFormSubmit={ handleSavedMoviesSearchFormSubmit }
      />
      <MoviesCardList
        isOnSavedMoviesPage
        moviesData={ moviesData }
        isLoading={ isLoading }
        savedMoviesData={ savedMoviesData }
        handleDeleteMovie={ handleDeleteMovie }
      />
    </section>
  )
}

export default SavedMovies;
