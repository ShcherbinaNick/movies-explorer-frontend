import { MAIN_BASE_URL } from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _onResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._onResponse)
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
      })
    })
    .then(this._onResponse)
  }

  saveMovie(movie) {

    const savedMovie = {
      movieId: movie.id || movie.movieId,
      nameRU: movie.nameRU || 'Неизвестное название',
      nameEN: movie.nameEN || 'Неизвестное название',
      director: movie.director || 'Неизвестный режиссёр',
      country: movie.country || 'Неизвестная страна',
      description: movie.description || 'Неизвестное описание',
      duration: movie.duration || 'Неизвестная длительность',
      image: `https://api.nomoreparties.co/${movie.image.url}` || 'Изображение отсутствует',
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}` || 'Изображение отсутствует',
      trailerLink: movie.trailerLink || 'Трейлер отсутствует',
      year: movie.year || 'Неизвестный год',
    }

    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(savedMovie)
    })
    .then(this._onResponse)

  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._onResponse)
  }

  getMyMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._onResponse)
  }

}


const mainApi = new MainApi({
  baseUrl: MAIN_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
});

export default mainApi;
