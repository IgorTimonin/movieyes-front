import { useEffect, useState } from 'react';
import useFormWithValidation from '../../hoc/useFormWithValidation';

import { moviesFinder, shortFilmSorter } from '../../utils/utils';
import './SearchForm.css';

export default function SearchForm({
  getMovies,
  moviesList,
  setIsSearchEnd,
  savedMoviesList,
  setSavedMoviesList,
  setFiltredMoviesList,
  setFiltredSavedMovies,
  setRenderedMovies,
  filtredMoviesList,
  setIsLoading,
  location,
  offsetReset,
  windowWidthChecker,
  setMessage,
  isSearchEnd,
  ...props
}) {
  // const { handleChange } = useFormWithValidation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isShortFilm, setIsShortFilm] = useState(
    JSON.parse(localStorage.getItem(`shortFilm`)) || false
  );
  let lastSearch = localStorage.getItem(`searchQuery`);
  let findedMovies = JSON.parse(localStorage.getItem(`findedMovies`));
  const [emptyQuery, setEmptyQuery] = useState('');

  function handleChangeQuery(e) {
    setSearchQuery(e.target.value);
    setEmptyQuery('');
  }

  //функция поиска фильмов с фильтром по короткометражкам
  function searchHandler(arr, query) {
    setIsSearchEnd(false);
    if (location === '/movies') {
      isShortFilm
        ? setFiltredMoviesList(moviesFinder(shortFilmSorter(arr), query))
        : setFiltredMoviesList(moviesFinder(arr, query));
      localStorage.setItem(`searchQuery`, query);
      localStorage.setItem(`findedMovies`, JSON.stringify(arr));
    }
    if (location === '/saved-movies') {
      isShortFilm
        ? setFiltredSavedMovies(moviesFinder(shortFilmSorter(arr), query))
        : setFiltredSavedMovies(moviesFinder(arr, query));
    }
    setIsSearchEnd(true);
    setIsLoading(false);
  }

  function submitHandler(e) {
    e.preventDefault();

    if (searchQuery) {
      setIsSearchEnd(false);
      setIsLoading(true);
      if (location === '/movies') {
        windowWidthChecker();
        moviesList.length !== 0
          ? searchHandler(moviesList, searchQuery)
          : getMovies();
      }
      if (location === '/saved-movies') {
        searchHandler(savedMoviesList, searchQuery);
      }
      setIsSearchEnd(true);
    } else {
      setEmptyQuery('Нужно ввести ключевое слово');
    }
    setIsSearchEnd(true);
  }

  const shortFilmChanger = () => {
    setIsShortFilm(!isShortFilm);
    if (location === '/movies') {
      localStorage.setItem(`shortFilm`, isShortFilm);
    }
  };

  useEffect(() => {
    if (location === '/movies' && findedMovies) {
      localStorage.setItem(`shortFilm`, isShortFilm);
      isShortFilm
        ? setFiltredMoviesList(shortFilmSorter(filtredMoviesList))
        : searchHandler(findedMovies, searchQuery);
    }
    if (location === '/saved-movies') {
      isShortFilm
        ? setFiltredSavedMovies(shortFilmSorter(savedMoviesList))
        : searchHandler(savedMoviesList, searchQuery);
    }
  }, [isShortFilm]);

  useEffect(() => {
    if (location === '/movies') {
      moviesList.length === 0
        ? setTimeout(() => {}, 2000)
        : searchHandler(moviesList, searchQuery);
    }
  }, [moviesList]);

  useEffect(() => {
    if (location === '/saved-movies') {
      if (isShortFilm) {
        setRenderedMovies(shortFilmSorter(savedMoviesList));
      }
      else {
        setRenderedMovies(savedMoviesList);
      }
    }
  }, [savedMoviesList]);

  useEffect(() => {
    setIsSearchEnd(false);
    if (location === '/movies') {
      let shortFilmStatus = localStorage.getItem(`shortFilm`);
      if (findedMovies) {
        setSearchQuery(lastSearch);
        if (JSON.parse(shortFilmStatus) !== true) {
          setIsShortFilm(false);
        } else {
          setIsShortFilm(true);
        }
        searchHandler(findedMovies, lastSearch);
      }
      setIsSearchEnd(false);
    }
    if (location === '/saved-movies') {
      setIsShortFilm(false);
      setSearchQuery('');
      setRenderedMovies(savedMoviesList);
      setIsSearchEnd(false);
    }
  }, [location]);

  return (
    <section className="searchForm">
      <div className="searchBar">
        <form className="searchBar__finder" onSubmit={submitHandler} noValidate>
          <div className={'searchBar__icon searchBar__icon_hide'}></div>
          <input
            type="text"
            value={searchQuery}
            name="searchMovie"
            className="searchBar__input"
            placeholder={emptyQuery ? emptyQuery : 'Фильм'}
            required
            minLength="1"
            onChange={handleChangeQuery}
          ></input>
          <button
            type="submit"
            className="searchBar__icon searchBar__submit app__btn-opacity"
          ></button>
        </form>
        <div className="searchBar__controls">
          <div className="searchBar__separator searchBar__icon_hide"></div>
          <input
            type="checkbox"
            name="shortFilm"
            className={`searchBar__checkbox app__btn-opacity ${
              isShortFilm ? 'searchBar__checkbox_active' : ''
            }`}
            checked={isShortFilm}
            onChange={shortFilmChanger}
          ></input>
          <label htmlFor="shortFilm" className="searchBar__label">
            Короткометражки
          </label>
        </div>
      </div>
    </section>
  );
}
//
