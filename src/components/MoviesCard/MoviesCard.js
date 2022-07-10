import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getTimeFromDuration } from "../../utils/getTimeFromDuration";

function MoviesCard({ movieData }) {

  const location = useLocation();

  const [ isPathSavedMovies, setIsPathSavedMovies ] = useState(false);

  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsPathSavedMovies(true);
    }
  }, [location.pathname]);

  const formatDuration = (duration) => {
    return getTimeFromDuration(duration)
  };
  
  const onTrailerLink = () => {
    window.open(movieData.trailerLink, '_blank')
  }

  return (
    <li className="movies-card">
      <div className="movies-card__image-container" onClick={ onTrailerLink }>
        <div className="movies-card__image-wrap">
          <img src={`https://api.nomoreparties.co${movieData.image.url}`} alt="скриншот фильма" className="movies-card__image" />
        </div>
      </div>
      <div className="movies-card__text">
        <h2 className="movies-card__name">{movieData.nameRU}</h2>
          { isPathSavedMovies ? 
            <>
              <button className="movies-card__button movies-card__button_type_delete" type="button" aria-label="удалить"></button>
            </>
          : 
            <>
              <button className={
                movieData.isSaved ?
                  "movies-card__button movies-card__button_type_liked"
                :
                  "movies-card__button movies-card__button_type_disliked"
              } 
                type="button" 
                aria-label="поставить лайк"
              >
              </button>
            </>
          }
      </div>
      <p className="movies-card__length">{formatDuration(movieData.duration)}</p>
    </li>
  );
}

export default MoviesCard;