import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFormWithValidation from '../../hoc/useFormWithValidation';
import './PageWithForm.css';

export default function PageWithForm({
  onSubmit,
  userName,
  setUserName,
  message,
  ...props
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { values, handleChange, resetForm, errors, isValid, setIsValid } =
    useFormWithValidation();
  const [activeMessage, setActiveMessage] = useState('');
  const location = useLocation();

  function handleValueChanger(e) {
    handleChange(e);
  }

  function handleSubmitSignup(e) {
    e.preventDefault();
    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setUserName('');
    setEmail('');
    setPassword('');
  }

  function handleSubmitSignin(e) {
    e.preventDefault();
    onSubmit({ password: values.password, email: values.email });
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if (message) {
      setIsValid(false);
      setActiveMessage(message);
    }
  }, [message]);

  useEffect(() => {
    setActiveMessage('');
    resetForm({}, {}, true);
  }, [location]);

  return (
    <div className="auth">
      <div className="auth__container">
        <Link
          className="header__logo header__logo_auth app__btn-opacity"
          to="/"
        />
        <h2 className="auth__title">{props.title}</h2>
        <form
          onSubmit={
            props.formName === 'register'
              ? handleSubmitSignup
              : handleSubmitSignin
          }
          className={`auth__form auth__${props.formName}-form`}
          name={`${props.formName}_form`}
          action="#"
        >
          <div className="auth__formInputBlock auth__formBlock">
            {location.pathname === '/signup' ? (
              <>
                <label htmlFor="userName" className="auth__input-label">
                  Имя
                </label>
                <input
                  className="auth__field auth__field_underline"
                  type="text"
                  value={values.name || ''}
                  onChange={handleValueChanger}
                  name="name"
                  autoComplete="name"
                  minLength="2"
                  maxLength="30"
                  pattern="[а-яА-Яa-zA-ZёË0-9\- ]{1,}"
                  required
                ></input>
                <span className="input-error_auth">{errors.name || ''}</span>
              </>
            ) : (
              ''
            )}
            <label htmlFor="userEmail" className="auth__input-label">
              E-mail
            </label>
            <input
              className="auth__field auth__field_underline"
              type="email"
              value={values.email || ''}
              onChange={handleValueChanger}
              name="email"
              placeholder="Email"
              autoComplete="email"
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
            ></input>
            <span className="user-email-input-error input-error_auth">
              {errors.email || ''}
            </span>
            <label htmlFor="userPassword" className="auth__input-label">
              Пароль
            </label>
            <input
              id={props.inputId}
              className="auth__field auth__field_underline"
              type="password"
              value={values.password || ''}
              onChange={handleValueChanger}
              name="password"
              placeholder="Пароль"
              autoComplete="current-password"
              required
            ></input>
            <span className="user-password-input-error input-error_auth">
              {errors.password || activeMessage || ''}
            </span>
          </div>
          <div className="auth__formBottonBlock auth__formBlock">
            <button
              className="auth__btn-save auth__form-submit app__btn-opacity"
              type="submit"
              disabled={ !isValid }
            >
              {props.btnText}
            </button>
            <p className="auth__login-text">
              {props.underBtnText}
              <Link
                className="auth__login-link app__btn-opacity"
                to={props.linkTo}
              >
                {props.linkText}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
