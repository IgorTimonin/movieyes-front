import SavedMoviesCardList from '../SavedMovies/SavedMoviesCardList/SavedMoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import { useEffect, useState } from 'react';

export default function SavedMovies({
  onClickLike,
  onClickRemove,
  savedMoviesList,
  setSavedMoviesList,
  getSavedMovies,
  location,
  isLoading,
  setIsLoading,
  isSearchEnd,
  setIsSearchEnd,
  message,
  setMessage,
  ...props
}) {
  const [filtredSavedMovies, setFiltredSavedMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);

  useEffect(() => {
    if (savedMoviesList.length === 0) {
      setIsLoading(true);
      getSavedMovies();
      setRenderedMovies(savedMoviesList);
      setIsLoading(false);
    }
    else {
    }
  }, [location]);

  useEffect(() => {
    setRenderedMovies(filtredSavedMovies);
  }, [filtredSavedMovies]);

  // useEffect(() => {
  //   setRenderedMovies(savedMoviesList);
  // }, [savedMoviesList]);

    useEffect(() => {
      if (isSearchEnd && filtredSavedMovies.length === 0) {
        setMessage('Ничего не найдено');
      } else {
        setMessage('');
      }
    }, [savedMoviesList, filtredSavedMovies]);

  return (
    <section className="movies movies__container">
      <SearchForm
        setIsSearchEnd={setIsSearchEnd}
        savedMoviesList={savedMoviesList}
        setSavedMoviesList={setSavedMoviesList}
        setFiltredSavedMovies={setFiltredSavedMovies}
        setRenderedMovies={setRenderedMovies}
        setIsLoading={setIsLoading}
        location={location}
        setMessage={setMessage}
      ></SearchForm>
      <SavedMoviesCardList
        renderedMovies={renderedMovies}
        onClickLike={onClickLike}
        onClickRemove={onClickRemove}
        location={location}
        isLoading={isLoading}
        message={message}
        setMessage={setMessage}
      ></SavedMoviesCardList>
    </section>
  );
}
