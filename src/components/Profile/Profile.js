import React from "react";

function Profile() {
  return(
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <fieldset className="profile__fieldset">
          <p className="profile__input-name">Имя</p>
          <input className="profile__input" id="profile-name" type="text" name="profile-name" placeholder="Виталий" required />
        </fieldset>
        <fieldset className="profile__fieldset">
          <p className="profile__input-name">E-mail</p>
          <input className="profile__input" id="profile-email" type="email" name="profile-email" placeholder="pochta@yandex.ru" required />
        </fieldset>
      </form>
      <div className="profile__button-wrapper">
        <button className="profile__button profile__button_type_edit" type="button">Редактировать</button>
        <button className="profile__button profile__button_type_logout" type="button">Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;