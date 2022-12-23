import './Techs.css';

export default function Techs(props) {
  return (
    <section className="techs" id="techs">
      <div className="techs__container">
        <h2 className="section__heading section__heading_techs">Технологии</h2>
        <h3 className="section__title section__title_techs">7 технологий</h3>
        <p className="techs_text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__info">
          <li className="app__btn app__btn_promo app__btn_techs app__btn_techs_html">
            HTML
          </li>
          <li className="app__btn app__btn_promo app__btn_techs app__btn_techs_css">
            CSS
          </li>
          <li className="app__btn app__btn_promo app__btn_techs app__btn_techs_js">
            JS
          </li>
          <li className="app__btn app__btn_promo app__btn_techs app__btn_techs_react">
            React
          </li>
          <li className="app__btn app__btn_promo app__btn_techs app__btn_techs_git">
            Git
          </li>
          <li className="app__btn app__btn_promo app__btn_techs app__btn_techs_express">
            Express
          </li>
          <li className="app__btn app__btn_promo app__btn_techs app__btn_techs_mongo">
            MongoDB
          </li>
        </ul>
      </div>
    </section>
  );
}
