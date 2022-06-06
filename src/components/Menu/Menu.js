import React from 'react';
import { Link } from 'react-router-dom';

function Menu({isOpen, onClose}) {
  return (
    <section className={`menu ${isOpen ? "menu_active" : ""}`} >
      <div className="menu__container">
        <button className="menu__close-button" onClick={onClose} ></button>
        <div className="menu__links">
          <Link to="/" className="menu__link" onClick={onClose}>Главная</Link>
          <Link to="/movies" className="menu__link" onClick={onClose}>Фильмы</Link>
          <Link to="/saved-movies" className="menu__link" onClick={onClose}>Сохранённые фильмы</Link>
          <Link to="/profile" className="menu__link_type_account" onClick={onClose}>Аккаунт</Link>
        </div>
      </div>
    </section>
  );
}

export default Menu;