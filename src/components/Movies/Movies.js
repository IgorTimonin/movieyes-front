import './Movies.css';
import MoviesCard from './MoviesCard/MoviesCard';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

export default function Movies({
  getMovies,
  moviesList,
  setMoviesList,
  loggedIn,
  isLoading,
  setIsLoading,
  location,
  savedMoviesList,
  onClickLike,
  onClickRemove,
  isSearchEnd,
  setIsSearchEnd,
  message,
  setMessage,
  ...props
}) {
  const [filtredMoviesList, setFiltredMoviesList] = useState([]);
  const [limit, setLimit] = useState(12);
  const [rowSize, setRowSize] = useState(3);
  const [offset, setOffset] = useState(limit);
  const [moreBtnActive, setMoreBtnActive] = useState(false);
  const setIsLiked = (movie) => savedMoviesList.find((i) => i.movieId === movie.id);

  // изменяем кол-во отображаемых карточек для кнопки 'Ещё'
  function offsetChanger() {
    if (offset <= limit) {
      setOffset(limit + rowSize);
    } else if (limit < offset < filtredMoviesList.length) {
      setOffset(offset + rowSize);
    }
  }

  function offsetReset() {
    setOffset(limit);
  }

  useEffect(() => {
    setOffset(limit);
  }, [limit]);

  // выбираем кол-во отображаемых карточек в зависимости от ширины экрана
  function windowWidthChecker() {
    if (window.innerWidth >= 1280) {
      setLimit(12);
      setRowSize(3);
    } else if (window.innerWidth >= 768) {
      setLimit(8);
      setRowSize(2);
    } else if (window.innerWidth < 768) {
      setLimit(5);
      setRowSize(2);
    }
  }

  //отслеживаем изменение ширины экрана каждые 2сек
  useEffect(() => {
    let resizeTimeout;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(windowWidthChecker, 2000);
    });

    window.removeEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(windowWidthChecker, 2000);
    });
  }, []);

  useEffect(() => {
    filtredMoviesList.length > offset
      ? setMoreBtnActive(true)
      : setMoreBtnActive(false);
  }, [filtredMoviesList, offset]);

  function getSavedMovieCard(arr, movie) {
    return arr.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }

  useEffect(() => {
    if (isSearchEnd && filtredMoviesList.length === 0) {
      setMessage('Ничего не найдено');
    } else {
      setMessage('');
    }
  }, [moviesList, filtredMoviesList]);

  return (
    <section className="movies movies__container">
      <SearchForm
        getMovies={getMovies}
        moviesList={moviesList}
        setIsSearchEnd={setIsSearchEnd}
        setFiltredMoviesList={setFiltredMoviesList}
        filtredMoviesList={filtredMoviesList}
        setIsLoading={setIsLoading}
        location={location}
        offsetReset={offsetReset}
        windowWidthChecker={windowWidthChecker}
      ></SearchForm>
      <MoviesCardList
        isLoading={isLoading}
        moreBtnActive={moreBtnActive}
        offsetChanger={offsetChanger}
        message={message}
        setMessage={setMessage}
      >
        {filtredMoviesList.slice(0, offset).map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id}
            location={location}
            savedMoviesList={savedMoviesList}
            onClickLike={onClickLike}
            onClickRemove={onClickRemove}
            isLiked={setIsLiked(movie)}
          />
        ))}
      </MoviesCardList>
    </section>
  );
}
