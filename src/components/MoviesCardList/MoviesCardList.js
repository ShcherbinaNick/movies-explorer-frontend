import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ADDED_RENDERED_CARDS_DESKTOP, ADDED_RENDERED_CARDS_MOBILE, ADDED_RENDERED_CARDS_TABLET,
  DESKTOP_RESOLUTION, MOBILE_RESOLUTION, RENDERED_CARDS_DESKTOP,
  RENDERED_CARDS_MOBILE, RENDERED_CARDS_TABLET } from "../../utils/constants";

function MoviesCardList({
    moviesData,
    isLoading,
    handleSaveMovie,
    savedMoviesData,
    handleDeleteMovie,
  }) {

  const location = useLocation()

  const [ renderedCards, setRenderedCards ] = useState(12)
  const [ addedRenderedCards, setAddedRenderedCards ] = useState(0)

  const [ width, setWidth ] = useState(window.innerWidth)

  const cardsCount = () => {
    if (width > DESKTOP_RESOLUTION) {
      setRenderedCards(RENDERED_CARDS_DESKTOP)
      setAddedRenderedCards(ADDED_RENDERED_CARDS_DESKTOP)
    } else if (width > MOBILE_RESOLUTION) {
      setRenderedCards(RENDERED_CARDS_TABLET)
      setAddedRenderedCards(ADDED_RENDERED_CARDS_TABLET)
    } else if (width < MOBILE_RESOLUTION) {
      setRenderedCards(RENDERED_CARDS_MOBILE)
      setAddedRenderedCards(ADDED_RENDERED_CARDS_MOBILE)
    }
  }

  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  })

  useEffect(() => {
    cardsCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ width ])

  const handleMoreBtnClick = () => {
    let count = 0
    count += 1
    setRenderedCards(renderedCards + addedRenderedCards * count)
  }

  return (
    isLoading ? <Preloader /> : (
    <section className="movies-card-list">
      { moviesData.length === 0  ? <p>Ничего не найдено</p> : '' }
      { !moviesData || !savedMoviesData ?
        <p>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : '' }
      <ul className="movies-card-list__grid">
        {
        moviesData
        .slice(0, renderedCards)
        .map((movie) => (
          <MoviesCard
            key={ movie.id || movie.movieId}
            movieData={ movie }
            handleSaveMovie={ handleSaveMovie }
            handleDeleteMovie={ handleDeleteMovie }
            savedMoviesData={ savedMoviesData }
          />
        ))
        }
      </ul>
      {
        (renderedCards < moviesData.length && location.pathname === '/movies')
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