import myPhoto from '../../images/myPhoto.jpg'

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__text">
          <ul className="about-me__list">
            <li className="about-me__name">
              <h3 className="about-me__subtitle">Никита</h3>
            </li>
            <li className="about-me__profession">
              <h4 className="about-me__profession-title">Фронтенд-разработчик, 26 лет</h4>
            </li>
            <li className="about-me__desc">
              <p className="about-me__desc-text">
                Я родился в Ивановской области в маленькой деревне, но всю жизнь провёл в Видном и Москве.
                Закончил МОИ по специальности "Прикладная информатика в экономике", но уже более 5-ти лет работаю тренером по плаванию в фитнес-клубе.
                В июле прошлого года начал обучение в "Яндекс.Практикум" и стал изучать веб-разработку.
                В свободное от учёбы и работы время я занимаюсь спортом, слушаю музыку, читаю книги, играю в онлайн-игры и гуляю с друзьями.
              </p>
            </li>
            <li className="about-me__links">
              <a className="about-me__link" href="https://vk.com/niksherful">Vk</a>
              <a className="about-me__link" href="https://github.com/ShcherbinaNick">Github</a>
            </li>
          </ul>
        </div>
          <img className="about-me__photo" src={myPhoto} alt="фотография Никиты"/>
      </div>
    </section>
  );
}

export default AboutMe;
