import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFormWithValidation from '../../hoc/useFormWithValidation';
import { CurrentUserContext } from '../context/CurrentUserContext';

import '../PageWithForm/PageWithForm.css';
import './Profile.css';

export default function Profile({
  onSubmit,
  onLogOut,
  message,
  setOnEdit,
  onEdit,
  ...props
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();
  const [activeMessage, setActiveMessage] = useState('');
  const location = useLocation();

  function handleValueChanger(e) {
    handleChange(e);
    setActiveMessage('');
  }

  function handleProfileEdit() {
    setActiveMessage('');
    setOnEdit(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name: values.name, email: values.email });
    setActiveMessage(message);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    setActiveMessage(message);
  }, [message]);

  useEffect(() => {
    setActiveMessage('');
    setOnEdit(false)
  }, [location]);

  const noValid =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <section className="userProfile">
      <div className="userProfile__wrapper">
        <div className="auth__container auth__container_profile">
          <h2 className="userProfile__title">{`Привет, ${
            currentUser.name || ''
          }!`}</h2>
          <form
            onSubmit={handleSubmit}
            className={`auth__form updateProfileForm`}
            name="updateProfileForm"
            noValidate
          >
            <div className="userProfile__input-block">
              <div className="auth__form-block">
                <div className="auth__form-string">
                  <label htmlFor="name" className="userProfile__input-label">
                    Имя
                  </label>
                  <input
                    className="userProfile__field"
                    type="text"
                    value={values.name || ''}
                    onChange={handleValueChanger}
                    name="name"
                    autoComplete="name"
                    minLength="2"
                    maxLength="30"
                    pattern="[а-яА-Яa-zA-ZёË0-9\- ]{1,}"
                    required
                    disabled={onEdit ? false : true}
                  ></input>
                </div>
                <span className="input-error">{errors.name || ''}</span>
              </div>
              <hr className="input__underline"></hr>
              <div className="auth__form-block">
                <div className="auth__form-string">
                  <label
                    htmlFor="useruserEmail"
                    className="userProfile__input-label"
                  >
                    E-mail
                  </label>
                  <input
                    className="userProfile__field"
                    type="email"
                    autoComplete="email"
                    value={values.email || ''}
                    onChange={handleValueChanger}
                    name="email"
                    maxLength="60"
                    pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    required
                    disabled={onEdit ? false : true}
                  ></input>
                </div>
                <span className="input-error">{errors.email || ''}</span>
              </div>
            </div>
            <div className="userProfile__btn-block">
              <span
                className={`userProfile__error ${
                  onEdit ? 'block__hide' : 'userProfile__error_white '
                }`}
              >
                {activeMessage}
              </span>
              <span
                className={`userProfile__error ${
                  onEdit ? 'input-error_auth' : 'block__hide'
                }`}
              >
                {activeMessage}
              </span>
              {onEdit ? (
                <button
                  type="button"
                  className="auth__form-submit app__btn-opacity auth__btn-save auth__btn-save_userProfile"
                  onClick={handleSubmit}
                  disabled={noValid || activeMessage}
                >
                  Сохранить
                </button>
              ) : (
                <button
                  type="submit"
                  className="auth__form-submit app__btn-opacity userProfile__btn-edit"
                  onClick={handleProfileEdit}
                >
                  Редактировать
                </button>
              )}
              <button
                className={`auth__form-submit app__btn-opacity ${
                  onEdit ? 'block__hide' : 'userProfile__btn-edit'
                }`}
                type="button"
                onClick={onLogOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
