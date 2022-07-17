import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";

function Profile({ onLogout, onUpdateProfile }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [ isValid, setIsValid ] = useState(false);

  const { 
    name, handleNameChange, nameError, setName,
    email, handleEmailChange, emailError, setEmail
  } = useForm();

  useEffect(() => {
  if (
    (name && !nameError) &&
    (email && !emailError) &&
    ((currentUser.name !== name) || (currentUser.email !== email))
  ) {
    setIsValid(true);
  } else {
    setIsValid(false);
  }
}, [ name, nameError, email, emailError, currentUser ])

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({
      name: name,
      email: email
    })
  }

  useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentUser ])

  return(
    <section className="profile">
      <h1 className="profile__title">Привет, { currentUser.name }!</h1>
      <form className="profile__form">
        <fieldset className="profile__fieldset">
          <p className="profile__input-name">Имя</p>
          <input 
            className="profile__input" 
            id="profile-name" 
            type="text" 
            name="profile-name" 
            required
            value={ name || ''}
            placeholder="Имя"
            onChange={ handleNameChange }
          />
        </fieldset>
        <fieldset className="profile__fieldset">
          <p className="profile__input-name">E-mail</p>
          <input 
            className="profile__input" 
            id="profile-email" 
            type="email" 
            name="profile-email" 
            required
            value={ email || '' }
            placeholder="E-mail"
            onChange={ handleEmailChange }
          />
        </fieldset>
      </form>
      <div className="profile__button-wrapper">
        <button 
          className={`profile__button profile__button_type_edit ${isValid ? '' : "profile__button_disabled" } ` }
          type="button"
          onClick={ handleSubmit }
          disabled={ !isValid }
        >
          Редактировать
        </button>
        <button 
          className="profile__button profile__button_type_logout" 
          type="button"
          onClick={ onLogout }
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  )
}

export default Profile;