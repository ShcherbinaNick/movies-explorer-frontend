import { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import logo from '../../images/logo.svg'

function Register({ onSubmit, isLoading }) {

  const [ isValid, setIsValid ] = useState(false);

  const { 
    name, handleNameChange, nameError,
    email, handleEmailChange, emailError,
    password, handlePasswordChange, passwordError,
   } = useForm();


  useEffect(() => {
    if (name && email && password &&
        !nameError && !emailError && !passwordError
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: name,
      password: password,
      email: email
    })
  }

  return(
    <section className="register">
      <Link to="/">
        <img src={logo} alt="зелёный кружок" className="register__logo" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={ handleSubmit }>
        <fieldset className="register__fieldset">
          <p className="register__input-name">Имя</p>
          <input 
            value={ name } 
            onChange={ handleNameChange }
            className="register__input" 
            id="register-name" 
            type="text"
            name="register-name" 
            placeholder="Введите ваше имя здесь" 
            required
          />
          <span className="register__input-error">{ nameError }</span>
        </fieldset>
        <fieldset className="register__fieldset">
          <p className="register__input-name">E-mail</p>
          <input 
            value={ email }
            onChange={ handleEmailChange }
            className="register__input" 
            id="register-email" 
            type="email" 
            name="register-email" 
            placeholder="Введите вашу почту здесь" 
            required 
          />
          <span className="register__input-error">{ emailError }</span>
        </fieldset>
        <fieldset className="register__fieldset">
          <p className="register__input-name">Пароль</p>
          <input 
            value={ password || '' } 
            onChange={ handlePasswordChange }
            className="register__input register__input_type_password" 
            id="register-password" 
            type="password" 
            name="register-password" 
            placeholder="Введите ваш пароль здесь" 
            required 
          />
          <span className="register__input-error">{ passwordError }</span>
        </fieldset>
      </form>
      <button 
        className={ `register__button ${!isValid ? "register__button_disabled" : ""}` }
        type="submit"
        onClick={ handleSubmit }
      >
        { isLoading ? 'Регистрация...' : 'Зарегистрироваться' }
      </button>
      <p className="register__auth">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin">Войти</Link>
      </p>
    </section>
  )
}

export default withRouter(Register);