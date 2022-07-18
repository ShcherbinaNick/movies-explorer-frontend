import { SHORT_MOVIE_DURATION } from "./constants";

export const filterMovies = (movies, query, isMoviesShort) => {
  if (isMoviesShort) {
    return movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(query.toLowerCase()) && item.duration < SHORT_MOVIE_DURATION
    });
  } else {
    return movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(query.toLowerCase())
    });
  }
}