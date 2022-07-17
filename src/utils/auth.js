import { MAIN_BASE_URL } from "./constants";

export const BASE_URL = MAIN_BASE_URL;

export const register = (userData) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then((res) => {
    if (res.status === 201) {
      return res.json()
    };
    return Promise.reject(`Ошибка ${ res.status }`)
  })
};

export const checkAuth = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${ res.status }`)
  })
}

export const login = (userData) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then((res) => {
    if (res.status === 200) {
      return res.json()
    };
    return Promise.reject(`Ошибка ${ res.status }`)
  })
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json()
    }
    return Promise.reject(`Вы вышли из учётной записи ${ res.status }`)
  })
}

export const editProfile = (userData) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
    }),
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json()
    }
    return Promise.reject(`Ошибка ${ response.status }`)
  })
}
