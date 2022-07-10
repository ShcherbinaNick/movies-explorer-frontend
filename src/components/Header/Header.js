import { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';

function Header({ isLoggedIn }) {
  
  const [ isMenuActive, setIsMenuActive ] = useState(false);

  const [ width, setWidth ] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  });

  const isMobile = width <= 768;

  function handleMenuClick() {
    setIsMenuActive(!isMenuActive)
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="зелёный кружок" className="header__link" />
      </Link>
      <nav className="header__navs">
        { isLoggedIn && isMobile && (
          <>
          <button className="header__menu-button" onClick={ handleMenuClick }></button>
          <Menu isOpen={ isMenuActive } onClose={ handleMenuClick } />
          </>
        )}
        { isLoggedIn && !isMobile && (
          <>
            <Link to="/movies" className="header__link header__link_type_movies">Фильмы</Link>
            <Link to="/saved-movies" className="header__link header__link_type_saved-movies">Сохранённые фильмы</Link>
            <Link to="/profile" className="header__link header__link_type_profile">Аккаунт</Link>
          </>
        )}
        { !isLoggedIn && (
          <>
            <Link to="/signup" className="header__link header__link_type_signup">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_type_signin">Войти</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
