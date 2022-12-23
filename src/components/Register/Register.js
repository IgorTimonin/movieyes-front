import PageWithForm from '../PageWithForm/PageWithForm';
import { useState } from 'react';
import './Register.css';
import useFormWithValidation from '../../hoc/useFormWithValidation';

export default function Register({ onSubmit, message, ...props }) {
  const [userName, setUserName] = useState('');
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  // function handleSetUserName(e) {
  //   handleChange(e);
  // }

  return (
    <section className="register section_height">
      <PageWithForm
        title="Добро пожаловать!"
        btnText="Зарегистрироваться"
        formName="register"
        inputId="current-password"
        linkTo="/signin"
        underBtnText="Уже зарегистрированы?"
        linkText="Войти"
        onSubmit={onSubmit}
        userName={values.name}
        setUserName={setUserName}
        message={message}
      >
      </PageWithForm>
    </section>
  );
}
