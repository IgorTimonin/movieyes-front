import { movieApiPath } from "../components/constants/constants";

export default function MoviesApi() {
  const result = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  return fetch(movieApiPath).then(result);
}

