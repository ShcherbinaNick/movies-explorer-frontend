import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ moviesData, isLoading }) {
  return(
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList 
        moviesData={ moviesData }
        isLoading={ isLoading } 
      />
    </section>
  )
}

export default SavedMovies;