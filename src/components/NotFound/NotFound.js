import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  return(
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle" >Страница не найдена</p>
      <button className="not-found__button" type="button" onClick={history.goBack}>Назад</button>
    </section>
  )
}

export default NotFound;