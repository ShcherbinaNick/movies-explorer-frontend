import React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";

function Profile({ onLogout, onUpdateProfile }) {

  const currentUser = React.useContext(CurrentUserContext);

  const history = useHistory();

  const [ isValid, setIsValid ] = React.useState(false);

  const { 
    name, handleNameChange, nameError,
    email, handleEmailChange, emailError,
   } = useForm();

  const signout = async () => {
    await logout();
    localStorage.clear();
    onLogout(false);
    history.push('/signin')
  }

  React.useEffect(() => {
  if (name && email &&
      !nameError && !emailError
  ) {
    setIsValid(true);
  } else {
    setIsValid(false);
  }
}, [ name, nameError, email, emailError])

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({
      name: name,
      email: email
    })
  }

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
            placeholder={ currentUser.name } 
            required
            value={ name }
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
            placeholder={ currentUser.email } 
            required
            value={ email }
            onChange={ handleEmailChange }
          />
        </fieldset>
      </form>
      <div className="profile__button-wrapper">
        <button 
          className={`profile__button profile__button_type_edit ${isValid ? '' : "profile__button_disabled" } ` }
          type="button"
          onClick={ handleSubmit }
        >
          Редактировать
        </button>
        <button 
          className="profile__button profile__button_type_logout" 
          type="button"
          onClick={ signout }
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  )
}

export default Profile;