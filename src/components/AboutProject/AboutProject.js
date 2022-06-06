import React from 'react';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__grid">
        <article className="about-project__desc">
          <h3 className="about-project__desc-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__desc-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="about-project__desc">
          <h3 className="about-project__desc-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__desc-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about-project__grid-scale">
        <div className="about-project__grid-item">
          <p className="about-project__grid-timeline about-project__grid-timeline_color_back">1 неделя</p>
          <p className="about-project__grid-text">Back-end</p>
        </div>
        <div className="about-project__grid-item">
          <p className="about-project__grid-timeline about-project__grid-timeline_color_front">4 недели</p>
          <p className="about-project__grid-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;