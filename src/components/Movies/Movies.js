import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesCard={props.moviesCard} />
    </section>
  )
}

export default Movies;