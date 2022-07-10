import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ moviesData, isLoading }) {

  const location = useLocation();

  const [ renderedCards, setRenderedCards ] = useState(12);
  const [ addedRenderedCards, setAddedRenderedCards ] = useState(0);

  const [ width, setWidth ] = useState(window.innerWidth);

  const cardsCount = () => {
    if (width > 768) {
      setRenderedCards(12);
      setAddedRenderedCards(3);
    } else if (width > 480) {
      setRenderedCards(8);
      setAddedRenderedCards(2);
    } else if (width < 480) {
      setRenderedCards(5);
      setAddedRenderedCards(2);
    }
  }

  const updateWidth = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  useEffect(() => {
    cardsCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  const handleMoreBtnClick = () => {
    let count = 0;
    count += 1;
    setRenderedCards(renderedCards + addedRenderedCards * count);
  }

  return(
    isLoading ? <Preloader /> : (
    <section className="movies-card-list">
      {moviesData.length === 0 ? <p>Ничего не найдено</p> : ''}
      {!moviesData ? <p>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : ''}
      <ul className="movies-card-list__grid">
      {moviesData
      .slice(0, location.pathname === '/saved-movies' ? moviesData.length : renderedCards)
      .map((movie) => (
          <MoviesCard
            key={ movie.id }
            movieData={ movie }
          />
        ))}
      </ul>
      {
        (renderedCards < moviesData.length && location.pathname==='/movies')
          && 
        (
          <button className="movies-card-list__else-button" onClick={ handleMoreBtnClick }>
            Ещё
          </button>
        )
      }
    </section>)
  )
}

export default MoviesCardList;