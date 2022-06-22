import React, { useEffect } from 'react';
import { Switch, Route, withRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as auth from '../../utils/auth';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import './App.css';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const history = useHistory();

  const [ currentUser, setCurrentUser ] = React.useState({});

  const [ movies, setMovies ] = React.useState([]);
  
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);

  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = React.useState(false);

  const [ infoTooltipText, setInfoTooltipText ] = React.useState('');


  const handleRegistration = (values) => {
    auth.register(values)
    .then((res) => {
      console.log(res);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Регистрация успешна!');
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText(`Не удалось зарегистрироваться: ${ err }`);
    })
  }

  const handleLogin = (values) => {
    auth.login(values)
    .then((res) => {
      setIsLoggedIn(true);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Авторизация пройдена!');
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText(`Не удалось авторизоваться: ${ err }`);
    })
  }

  const handleUpdateUser = (newUserInfo) => {
    auth.editProfile(newUserInfo)
      .then((newData) => {
        setCurrentUser(newData);
        setIsInfoTooltipOpen(true);
        setInfoTooltipText('Информация о пользователе обновлена!');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setInfoTooltipText(`Не удалось обновить информацию о пользователе: ${ err }`);
      });
  }

  const checkToken = () => {
    auth.checkAuth()
    .then((res) => {
      if (res) {
        setIsLoggedIn(true);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText(`Кажется, вы не авторизованы: ${ err }`);
    })
  }

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      Promise.all([ mainApi.getUserInfo(), moviesApi.getBeatfilmMovies() ])
        .then(([ user, movies ]) => {
          setCurrentUser(user);
          setMovies(movies);
          console.log(movies);
        })
        .catch(err => console.log(err));
      }
    }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className='app'>
        <Route exact path={ ['/', '/movies', '/saved-movies', '/profile'] }>
          <Header/>
        </Route>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/signup'>
            <Register onSubmit={ handleRegistration } />
          </Route>
          <Route exact path='/signin'>
            <Login onSubmit={ handleLogin } />
          </Route>
          <ProtectedRoute 
            exact
            path='/movies'
            moviesData={ movies }
            component={ Movies }
            loggedIn={ isLoggedIn }
          />
          <ProtectedRoute 
            exact
            path='/saved-movies'
            moviesData={ movies }
            component={ SavedMovies }
            loggedIn={ isLoggedIn }
            />
          <ProtectedRoute 
            exact
            path='/profile'
            component={ Profile }
            loggedIn={ isLoggedIn }
            onLogout={ setIsLoggedIn }
            onUpdateProfile={ handleUpdateUser }
          />
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <Route exact path={ ['/', '/movies', '/saved-movies'] }>
          <Footer/>
        </Route>
        <InfoTooltip isOpen={ isInfoTooltipOpen } onClose={ closeInfoTooltip } infoTooltipText={ infoTooltipText } />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default withRouter(App);
