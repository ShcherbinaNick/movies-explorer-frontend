import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          Статичный сайт
          <a className="portfolio__link" href="https://shcherbinanick.github.io/how-to-learn/" target="_blank" rel="noreferrer">
          </a>
        </li>
        <li className="portfolio__list-item">
          Адаптивный сайт
          <a className="portfolio__link" href="https://shcherbinanick.github.io/russian-travel/" target="_blank" rel="noreferrer">
          </a>
        </li>
        <li className="portfolio__list-item">
          Одностраничное приложение
          <a className="portfolio__link" href="https://shcherbinanick.github.io/mesto/" target="_blank" rel="noreferrer">
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;