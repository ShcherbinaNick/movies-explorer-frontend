import React from "react";

function MoviesCard({moviesCard}) {
  return (
    <li className="movies-card">
      <img src={ moviesCard.image } alt="скриншот фильма" className="movies-card__image" />
      <div className="movies-card__text">
        <h2 className="movies-card__name">{moviesCard.nameRU}</h2>
        <button className="movies-card__like-button" type="button" aria-label="поставить лайк"></button>
      </div>
      <p className="movies-card__length">{moviesCard.duration}</p>
    </li>
  );
}

export default MoviesCard;