import { timeToHour } from '../../../utils/utils';
import { baseApiPath } from '../../constants/constants';
import './MoviesCard.css';

export default function MoviesCard({
  movie,
  savedMoviesList,
  onClickLike,
  onClickRemove,
  location,
  isLiked,
  ...props
}) {

  // const isLiked = savedMoviesList.find((i) => i.movieId === movie.id);
  const movieLikeBtnClassName = `movie__bookmark-btn app__btn-opacity movie__bookmark-btn_save movie__save-btn ${
    isLiked ? 'movie__save-btn_active' : ''
  }`;

  const urlTest = /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i;

  function handleDeleteClick() {
    onClickRemove(movie);
  }

  function handleLikeClick() {
    if (!isLiked)
      onClickLike({
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        trailerLink: movie.trailerLink.match(urlTest)
          ? movie.trailerLink
          : `https://www.youtube.com/results?search_query=${movie.nameEN}`,
        image: `${baseApiPath}` + `${movie.image.url}`,
        thumbnail: `${baseApiPath}` + `${movie.image.formats.thumbnail.url}`,
      });
    else {
      onClickRemove(savedMoviesList.filter((i) => i.movieId === movie.id)[0]);
    }
  }

  return (
    <section className="moviesCard">
      <li className="movie__item">
        <div className="movie__title-container">
          <div className="movie__title">
            <h2 className="movie__name">{movie.nameRU}</h2>
            <div className="movie__duration">{timeToHour(movie.duration)}</div>
          </div>
          {location === '/movies' ? (
            <button
              className={movieLikeBtnClassName}
              type="button"
              onClick={handleLikeClick}
            />
          ) : (
            <button
              className="movie__bookmark-btn app__btn-opacity movie__bookmark-btn_del"
              type="button"
              onClick={handleDeleteClick}
            />
          )}
        </div>
        <a
          className="app__btn-opacity movie__img-link"
          target="_blank"
          rel="noreferrer"
          href={movie.trailerLink}
        >
          <img
            className="movie__img"
            src={
              location === '/saved-movies'
                ? `${movie.image}`
                : `${baseApiPath}` + `${movie.image.url}`
            }
            alt={`постер фильма ${movie.nameRU}`}
          />
        </a>
      </li>
    </section>
  );
}
