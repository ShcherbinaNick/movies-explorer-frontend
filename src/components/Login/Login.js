import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import logo from '../../images/logo.svg';

function Login({ onSubmit }) {

  const [ isValid, setIsValid ] = React.useState(false);

  const { 
    email, handleEmailChange, emailError,
    password, handlePasswordChange, passwordError,
   } = useForm();

   React.useEffect(() => {
    if (email && password &&
        !emailError && !passwordError
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [ email, password, emailError, passwordError])

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      password: password,
      email: email
    })
  }

  return(
    <section className="login">
      <Link to="/">
        <img className="login__logo" src={logo} alt="зелёный кружок" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={ handleSubmit }>
        <fieldset className="login__fieldset">
          <p className="login__input-name">E-mail</p>
          <input 
            className="login__input" 
            id="login-email" 
            type="email" 
            name="login-email" 
            placeholder="Введите вашу почту здесь" 
            required 
            value={ email } 
            onChange={ handleEmailChange }
          />
          <span className="login__input-error">{ emailError }</span>
        </fieldset>
        <fieldset className="login__fieldset">
          <p className="login__input-name">Пароль</p>
          <input 
            className="login__input" 
            id="login-password" 
            type="password" 
            name="login-password" 
            placeholder="Введите ваш пароль здесь" 
            required 
            value={ password } 
            onChange={ handlePasswordChange }
          />
          <span className="login__input-error">{ passwordError }</span>
        </fieldset>
      </form>
      <button 
        className={ `login__button ${!isValid ? "login__button_disabled" : ""}` }
        type="submit"
        onClick={ handleSubmit } 
      >
        Войти
      </button>
      <p className="login__auth">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup">Регистрация</Link>
      </p>
    </section>
  )
}

export default withRouter(Login);