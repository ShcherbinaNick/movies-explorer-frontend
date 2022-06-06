import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {

  const location = useLocation();
  const [isPathSavedMovies, setIsPathSavedMovies] = useState(false);
  const [ isLoading, setIsloading ] = useState(true);

  React.useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setIsPathSavedMovies(true);
    }
  }, [location.pathname]);  
    
  React.useEffect(() => {
      setTimeout(() => {
          setIsloading(false);
      }, 3000);
  }, []);

  return(
    isLoading ? <Preloader /> : (
    <section className="movies-card-list">
      <ul className="movies-card-list__grid">
      {props.moviesCard.map((card) => (
          <MoviesCard
            key={card.id}
            moviesCard={card}
          />
        ))}
      </ul>
      { isPathSavedMovies ? 
        <> {/* <-- временное решение до этапа функциональности ради сходства с макетом */}
        </>
      :
        <>
          <button className="movies-card-list__else-button">Ещё</button>
        </>
      }
      
    </section>)
  )
}

export default MoviesCardList;