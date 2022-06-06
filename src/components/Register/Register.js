import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import logo from '../../images/logo.svg'

function Register() {
  return(
    <section className="register">
      <Link to="/">
        <img src={logo} alt="зелёный кружок" className="register__logo" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <fieldset className="register__fieldset">
          <p className="register__input-name">Имя</p>
          <input className="register__input" id="register-name" type="text" name="register-name" placeholder="Введите ваше имя здесь" required />
          <span className="register__input-error"></span>
        </fieldset>
        <fieldset className="register__fieldset">
          <p className="register__input-name">E-mail</p>
          <input className="register__input" id="register-email" type="email" name="register-email" placeholder="Введите вашу почту здесь" required />
          <span className="register__input-error"></span>
        </fieldset>
        <fieldset className="register__fieldset">
          <p className="register__input-name">Пароль</p>
          <input className="register__input register__input_type_password" id="register-password" type="password" name="register-password" placeholder="Введите ваш пароль здесь" required />
          <span className="register__input-error">Что-то пошло не так...</span> {/* <-- В ТЗ не указано, нужно ли перекрашивать или выводить на этапе верстки */}
        </fieldset>
      </form>
      <button className="register__button" type="submit">Зарегистрироваться</button>
      <p className="register__auth">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin">Войти</Link>
      </p>
    </section>
  )
}

export default withRouter(Register);