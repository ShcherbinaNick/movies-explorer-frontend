function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          Статичный сайт
          <a className="portfolio__link" href="https://shcherbinanick.github.io/how-to-learn/">
          </a>
        </li>
        <li className="portfolio__list-item">
          Адаптивный сайт
          <a className="portfolio__link" href="https://shcherbinanick.github.io/russian-travel/">
          </a>
        </li>
        <li className="portfolio__list-item">
          Одностраничное приложение
          <a className="portfolio__link" href="https://shcherbinanick.github.io/mesto/">
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;