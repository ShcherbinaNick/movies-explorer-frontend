import { MOVIES_BASE_URL } from "./constants";

class MoviesApi {
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

  getBeatfilmMovies() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._onResponse)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default moviesApi;