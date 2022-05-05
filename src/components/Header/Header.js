import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="зелёный кружок" className="header__link" />
      </Link>
      <nav className="header__navs">
        <Link to="/signup" className="header__link header__link_type_signup">Регистрация</Link>
        <Link to="/signin" className="header__link header__link_type_signin">Войти</Link>
      </nav>
    </header>
  );
};

export default Header;
