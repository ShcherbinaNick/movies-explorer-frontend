import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
  return(
    <section className="login">
      <img className="login__logo" src={logo} alt="зелёный кружок" />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <fieldset className="login__fieldset">
          <p className="login__input-name">E-mail</p>
          <input className="login__input" id="login-email" type="email" name="login-email" placeholder="Введите вашу почту здесь" required />
          <span className="login__input-error"></span>
        </fieldset>
        <fieldset className="login__fieldset">
          <p className="login__input-name">Пароль</p>
          <input className="login__input" id="login-password" type="password" name="login-password" placeholder="Введите ваш пароль здесь" required />
          <span className="login__input-error"></span>
        </fieldset>
      </form>
      <button className="login__button" type="submit">Войти</button>
      <p className="login__auth">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup">Регистрация</Link>
      </p>
    </section>
  )
}

export default withRouter(Login);