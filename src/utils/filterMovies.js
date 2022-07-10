export const filterMovies = (movies, query, isMoviesShort) => {
  if (isMoviesShort) {
    return movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(query.toLowerCase()) && item.duration < 41
    });
  } else {
    return movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(query.toLowerCase())
    });
  }
}