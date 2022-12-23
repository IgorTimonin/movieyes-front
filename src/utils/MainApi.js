import { mainApiPath } from '../components/constants/constants';

export const resultHandler = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor(apiPath, headers) {
    this._apiPath = apiPath;
    this._headers = { 'Content-Type': 'application/json' };
  }

  signInSignUp(endpoint, name, password, email) {
    return fetch(this._apiPath + `${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(name, password, email),
    }).then(resultHandler);
  }

  signout() {
    return fetch(this._apiPath + '/signout', {
      credentials: 'include',
      headers: this._headers,
    }).then(resultHandler);
  }

  getUserData() {
    return fetch(this._apiPath + `/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(resultHandler);
  }

  setUserData(userData) {
    return fetch(this._apiPath + `/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(resultHandler);
  }

  getSavedMovie() {
    return fetch(this._apiPath + '/movies', {
      method: 'GET',
      credentials: 'include',
    }).then(resultHandler);
  }

  postNewMovie(movieCard) {
    return fetch(this._apiPath + '/movies', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movieCard),
    }).then(resultHandler);
  }

  deleteMovie(cardId) {
    return fetch(this._apiPath + `/movies/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(resultHandler);
  }

  likeSwitcher(cardId, isLiked) {
    if (isLiked) {
      return fetch(this._apiPath + `/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(resultHandler);
    } else {
      return fetch(this._apiPath + `/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      }).then(resultHandler);
    }
  }
}

export const mainApi = new Api(mainApiPath, {

});
