import './Footer.css';
import { animateScroll as scroll } from 'react-scroll';
import { useEffect, useState } from 'react';

export default function Footer({location}) {

const [isActive, setIsActive] = useState(false);
const windowInnerHeight = document.documentElement.clientHeight;

const setButtonVisible = () => {
  if (window.pageYOffset >= (windowInnerHeight * 0.9)) {
    setIsActive(true);
  } else {
    setIsActive(false);
  }
}

useEffect(() => {
  window.addEventListener('scroll', setButtonVisible);
  // window.removeEventListener('scroll', setButtonVisible);
}, []);

  return (
    <footer
      className={`footer ${
        location === '/signup' ||
        location === '/signin' ||
        location === '/profile'
          ? 'block__hide'
          : ''
      }`}
    >
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; Timonin Igor 2022</p>
        <div className="footer__nav">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://practicum.yandex.ru/"
            className="profile__social profile__social_footer app__btn app__btn-opacity"
          >
            Яндекс.Практикум
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/IgorTimonin"
            className="profile__social profile__social_footer app__btn app__btn-opacity"
          >
            Github
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/igor-timonin-750085232/"
            className="profile__social profile__social_footer app__btn app__btn-opacity"
          >
            LinkedIn
          </a>
          {/* {isActive ? */}
          <div
            className={`footer__toTopBtn app__btn-opacity ${
              isActive ? 'footer__toTopBtn_visible' : ''
            }`}
            onClick={() => scroll.scrollToTop()}
          ></div>
          {/* : ''} */}
        </div>
      </div>
    </footer>
  );
}
