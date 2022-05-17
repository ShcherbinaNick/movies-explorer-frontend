import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return(
    <section className="movies-card-list">
      <ul className="movies-card-list__grid">
      {props.moviesCard.map((card) => (
          <MoviesCard
            key={card.id}
            moviesCard={card}
          />
        ))}
      </ul>
      <button className="movies-card-list__else-button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;