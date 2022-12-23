import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage(props) {
  const navigate = useNavigate();
  return (
    <section className="notFoundPage">
      <div className="notFoundPage_container">
        <h2 className="notFoundPage__title">404</h2>
        <p className="notFoundPage__text">Страница не найдена</p>
        <button
          className="notFoundPage__backBtn  app__btn-opacity"
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
      </div>
    </section>
  );
}
