import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({moviesCard}) {

  const location = useLocation();
  const [isPathSavedMovies, setIsPathSavedMovies] = useState(false);

  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsPathSavedMovies(true);
    }
  }, [location.pathname]);

  return (
    <li className="movies-card">
      <img src={ moviesCard.image } alt="скриншот фильма" className="movies-card__image" />
      <div className="movies-card__text">
        <h2 className="movies-card__name">{moviesCard.nameRU}</h2>
          { isPathSavedMovies ? 
            <>
              <button className="movies-card__button movies-card__button_type_delete" type="button" aria-label="удалить"></button>
            </>
          : 
            <>
              <button className={
                moviesCard.isSaved ?
                "movies-card__button movies-card__button_type_liked"
              :
                "movies-card__button movies-card__button_type_disliked"
              } type="button" aria-label="поставить лайк"></button>
            </>
          }
      </div>
      <p className="movies-card__length">{moviesCard.duration}</p>
    </li>
  );
}

export default MoviesCard;