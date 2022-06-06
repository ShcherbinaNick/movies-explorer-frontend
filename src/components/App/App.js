import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import demoImg1 from '../../images/demoImg1.jpg';
import demoImg2 from '../../images/demoImg2.jpg';
import demoImg3 from '../../images/demoImg3.jpg';
import demoImg4 from '../../images/demoImg4.jpg';
import './App.css';

const moviesCard = [
  {
    id: 1,
    duration: '1ч 47м',
    image: demoImg1,
    nameRU: '33 слова о дизайне',
    isSaved: true
  },
  {
    id: 2,
    duration: '1ч 3м',
    image: demoImg2,
    nameRU: 'Киноальманах «100 лет дизайна»',
    isSaved: false
  },
  {
    id: 3,
    duration: '1ч 42м',
    image: demoImg3,
    nameRU: 'В погоне за Бенкси',
    isSaved: false
  },
  {
    id: 4,
    duration: '1ч 21м',
    image: demoImg4,
    nameRU: 'Баския: Взрыв реальности',
    isSaved: false
  }
];

function App() {
  return (
    <div className="app">
      <Route exact path={['/', '/movies', '/saved-movies', '/profile']} >
        <Header/>
      </Route>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/movies">
          <Movies moviesCard={moviesCard} />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies moviesCard={moviesCard} />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Route exact path={['/', '/movies', '/saved-movies']} >
        <Footer/>
      </Route>

    </div>
  );
}

export default withRouter(App);
