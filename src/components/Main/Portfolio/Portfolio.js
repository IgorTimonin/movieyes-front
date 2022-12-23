import './Portfolio.css';

export default function Portfolio(props) {
  return (
    <section className="portfolio section">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            target="_blank"
            rel="noreferrer"
            className="portfolio__link app__btn-opacity"
            href="https://igortimonin.github.io/how-to-learn/"
          >
            <p className="portfolio__name">Статичный сайт</p>
            <div className="portfolio__link-logo"></div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            target="_blank"
            rel="noreferrer"
            className="portfolio__link app__btn-opacity"
            href="https://igortimonin.github.io/russian-travel/"
          >
            <p className="portfolio__name">Адаптивный сайт</p>
            <div className="portfolio__link-logo"></div>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            target="_blank"
            rel="noreferrer"
            className="portfolio__link app__btn-opacity"
            href="https://itmesto.students.nomoredomains.sbs/"
          >
            <p className="portfolio__name">Одностраничное приложение</p>
            <div className="portfolio__link-logo"></div>
          </a>
        </li>
      </ul>
    </section>
  );
}
