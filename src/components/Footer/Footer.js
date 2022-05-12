function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__links">
        <p className="footer__copyright">&#169; {new Date().getFullYear()}</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a className="footer__link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link" href="https://github.com">Github</a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link" href="https://facebook.com">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;