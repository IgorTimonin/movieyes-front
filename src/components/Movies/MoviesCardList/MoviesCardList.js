import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

export default function MoviesCardList({
  movies,
  moreBtnActive,
  offsetChanger,
  isLoading,
  message,
  setMessage,
  ...props
}) {


  return (
    <section className="moviesCardList">
      <div className="moviesCardList__container">
        <ul className="movieCardList__gallery">{props.children}</ul>
        <Preloader isLoading={isLoading}></Preloader>
        <p className="moviesCardList__not-found">
          {message}
        </p>
        <div className="moviesCardList__more">
          <button
            className={`moviesCardList_more-btn app__btn-opacity ${
              moreBtnActive ? '' : 'block__hide'
            }`}
            onClick={offsetChanger}
          >
            Ещё
          </button>
        </div>
      </div>
    </section>
  );
}
