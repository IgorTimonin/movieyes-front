import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({
  loggedIn,
  isOpen,
  openMenu,
  closeMenu,
  location,
  ...props
}) {
  return (
    <header
      className={`header section ${
        location === '/signup' || location === '/signin' ? 'block__hide' : ''
      }`}
    >
      <div className="header__nav-block">
        <Link className="header__logo app__btn-opacity" to="/" />
        <Navigation
          loggedIn={loggedIn}
          isOpen={isOpen}
          closeMenu={closeMenu}
          menuClass=""
        ></Navigation>
      </div>
      <div
        className={`header__user-block ${
          location === '/' && !loggedIn
            ? 'header__user-block_mobile'
            : ''
        }`}
      >
        <Link
          className={`app__btn nav__link app__btn-opacity ${
            loggedIn ? 'block__hide' : 'header__reg-btn'
          }`}
          onClick={closeMenu}
          to="/signup"
        >
          Регистрация
        </Link>
        <Link
          className={`app__btn header__user-btn app__btn-opacity ${
            loggedIn ? 'block__hide' : 'header__user-btn_green'
          }`}
          onClick={closeMenu}
          to="/signin"
        >
          Войти
        </Link>
        <Link
          className={`app__btn header__user-btn app__btn-opacity ${
            loggedIn ? 'header__user-btn_black' : 'block__hide'
          }`}
          to="/profile"
        >
          Аккаунт
        </Link>
      </div>
      <button
        className={`${
          location === '/' && !loggedIn
            ? 'block__hide'
            : 'header__menu-btn app__btn-opacity'
        }`}
        onClick={openMenu}
      ></button>
    </header>
  );
}
