import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    if (location.pathname === '/movies' || location.pathname === '/saved-movies') {
      setIsLoggedIn(true)
    }
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="зелёный кружок" className="header__link" />
      </Link>
      <nav className="header__navs">
        { !isLoggedIn && (
          <>
            <Link to="/signup" className="header__link header__link_type_signup">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_type_signin">Войти</Link>
          </>
        )}
        { isLoggedIn && (
          <>
            <Link to="/movies" className="header__link header__link_type_movies">Фильмы</Link>
            <Link to="/saved-movies" className="header__link header__link_type_saved-movies">Сохранённые фильмы</Link>
            <Link to="/profile" className="header__link header__link_type_profile">Аккаунт</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
