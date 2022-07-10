import React, { useEffect, useState } from 'react';
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

function App() {

  const history = useHistory();

  const [ currentUser, setCurrentUser ] = useState({});

  const [ movies, setMovies ] = useState([]);

  const [ filteredMovies, setFilteredMovies ] = useState([]);

  const [ isLoading, setIsLoading ] = useState(false);
  
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = useState(false);

  const [ infoTooltipText, setInfoTooltipText ] = useState('');

  const [ searchQuery, setSearchQuery ] = useState('');

  const [ isCheckboxChecked, setIsCheckboxChecked ] = useState(false);

  // Регистрация

  const handleRegistration = (values) => {
    setIsLoading(true);
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
    .finally(() => {
      setIsLoading(false);
    })
  }

  // Вход

  const handleLogin = (values) => {
    setIsLoading(true);
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
    .finally(() => {
      setIsLoading(false);
    })
  }

  // Обновление информации пользователя

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    auth.editProfile(newUserInfo)
      .then((newData) => {
        setCurrentUser(newData);
        setIsInfoTooltipOpen(true);
        setInfoTooltipText('Информация о пользователе обновлена!');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setInfoTooltipText(`Не удалось обновить информацию о пользователе: ${ err }`);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Функция проверки токена

  const checkToken = () => {
    auth.checkAuth()
    .then((res) => {
      if (res) {
        setIsLoggedIn(true);
        history.push('/movies')
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText(`Кажется, вы не авторизованы: ${ err }`);
    })
  }

  // Закрытие тултипа

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  // Получение данных пользователя 

  useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      setIsLoading(true);
      mainApi.getUserInfo()
        .then((currentUser) => {
          setCurrentUser(currentUser);
          setIsLoading(false);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        })
      }
    }, [ isLoggedIn ]);

  // Локальное хранилище (результаты последнего запроса)

  useEffect(() => {
    if (localStorage.getItem('filtrationResult')) {
      setFilteredMovies(JSON.parse(localStorage.getItem('filtrationResult')))
    }
    if (localStorage.getItem('savedQuery')) {
      setSearchQuery(localStorage.getItem('savedQuery'))
    }
    if (localStorage.getItem('checkboxState')) {
      setIsCheckboxChecked(JSON.parse(localStorage.getItem('checkboxState')))
    }
  }, [ setFilteredMovies, setSearchQuery, setIsCheckboxChecked ])


  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className='app'>
        <Route exact path={ ['/', '/movies', '/saved-movies', '/profile'] }>
          <Header isLoggedIn={ isLoggedIn } />
        </Route>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/signup'>
            <Register 
              onSubmit={ handleRegistration } 
              isLoading={ isLoading } 
            />
          </Route>
          <Route exact path='/signin'>
            <Login 
              onSubmit={ handleLogin }
              isLoading={ isLoading } 
            />
          </Route>
          <ProtectedRoute 
            exact
            path='/movies'
            moviesData={ movies }
            setMovies={ setMovies }
            setFilteredMovies={ setFilteredMovies }
            filteredMovies={ filteredMovies }
            component={ Movies }
            loggedIn={ isLoggedIn }
            isLoading={ isLoading }
            setIsLoading={ setIsLoading }
            setIsInfoTooltipOpen={ setIsInfoTooltipOpen }
            setInfoTooltipText={ setInfoTooltipText }
            searchQuery={ searchQuery }
            setSearchQuery={ setSearchQuery }
            isCheckboxChecked={ isCheckboxChecked }
            setIsCheckboxChecked={ setIsCheckboxChecked }
          />
          <ProtectedRoute 
            exact
            path='/saved-movies'
            moviesData={ movies }
            component={ SavedMovies }
            loggedIn={ isLoggedIn }
            isLoading={ isLoading }
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
