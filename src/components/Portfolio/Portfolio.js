import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://shcherbinanick.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            Статичный сайт
          </a>
          <button className="portfolio__link-button" />
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://shcherbinanick.github.io/russian-travel/" target="_blank" rel="noreferrer">
            Адаптивный сайт
          </a>
          <button className="portfolio__link-button" />
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://shcherbinanick.github.io/mesto/" target="_blank" rel="noreferrer">
            Одностраничное приложение
          </a>
          <button className="portfolio__link-button" />
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;