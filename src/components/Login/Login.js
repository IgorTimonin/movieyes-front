import PageWithForm from '../PageWithForm/PageWithForm';
import './Login.css';

export default function Login({ onSubmit, message, ...props }) {
  return (
    <section className="login section_height">
      <PageWithForm
        title="Рады видеть!"
        btnText="Войти"
        formName="login"
        inputId="current-password"
        linkTo="/signup"
        underBtnText="Ещё не зарегистрированы?"
        linkText="Регистрация"
        onSubmit={onSubmit}
        message={message}
      ></PageWithForm>
    </section>
  );
}
