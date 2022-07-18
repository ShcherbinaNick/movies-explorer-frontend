import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, useHistory, useLocation } from 'react-router-dom';
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
import { filterMovies } from '../../utils/filterMovies';

function App() {

  const history = useHistory();

  const location = useLocation();

  const [ currentUser, setCurrentUser ] = useState({});

  const [ movies, setMovies ] = useState([]);

  const [ savedMovies, setSavedMovies ] = useState([]);

  const [ filteredMovies, setFilteredMovies ] = useState([]);

  const [ filteredSavedMovies, setFilteredSavedMovies ] = useState([]);

  const [ isLoading, setIsLoading ] = useState(false);

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = useState(false);

  const [ infoTooltipText, setInfoTooltipText ] = useState('');

  const [ searchQuery, setSearchQuery ] = useState('');

  const [ isCheckboxChecked, setIsCheckboxChecked ] = useState(false);

  const [ isShortMoviesCheckboxChecked, setIsShortMoviesCheckboxChecked ] = useState(false);

  const [ isMoviesFound, setIsMoviesFound ] = useState(true);

  const [ isSavedMoviesFound, setIsSavedMoviesFound ] = useState(true);
  
  // Вход
  
  const handleLogin = (values) => {
    setIsLoading(true);
    auth.login(values)
    .then((res) => {
      setIsLoggedIn(true);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Авторизация пройдена!');
      autoCloseInfoTooltip();
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText(`Не удалось авторизоваться, проверьте правильность ввода данных: ${ err }`);
      autoCloseInfoTooltip();
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  // Регистрация

  const handleRegistration = (values) => {
    setIsLoading(true);
    auth.register(values)
    .then(() => {
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Регистрация успешна!');
      autoCloseInfoTooltip();
    })
    .then(() => {
      const {email, password} = values;
      handleLogin({email, password});
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText(`Не удалось зарегистрироваться: ${ err }`);
      autoCloseInfoTooltip();
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
        autoCloseInfoTooltip();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setInfoTooltipText(`Не удалось обновить информацию о пользователе: ${ err }`);
        autoCloseInfoTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Функция проверки токена и защита от редиректа

  const checkToken = () => {
    const path = location.pathname;
    auth.checkAuth()
    .then((res) => {
      if (res) {
        setIsLoggedIn(true);
        setCurrentUser(res);
        if (path === '/signin' || path === '/signup') {
          history.push('/movies')
        } else {
          history.push(path)
        }
      }
    })
    .catch((err) => {
      console.log(err);
      setIsLoggedIn(false);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText(`Кажется, вы не авторизованы: ${ err }`);
      autoCloseInfoTooltip();
    })
  }

  useEffect(() => {
    checkToken(location.pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Проверка фильмов на наличие

  const isFilmsFound = (filtrationResult) => {
    if (filtrationResult.length === 0) {
      setIsMoviesFound(false);
    } else {
      setIsMoviesFound(true);
    }
  }

  const isSavedFilmsFound = (filtrationResult) => {
    if (filtrationResult.length === 0) {
      setIsSavedMoviesFound(false);
    } else {
      setIsSavedMoviesFound(true);
    }
  }

  // Поиск по всем фильмам
 
  const handleMoviesSearchFormSubmit = () => {
    if (searchQuery.length === 0) {
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Нужно ввести ключевое слово');
      autoCloseInfoTooltip();
    } else {
      setIsLoading(true);
      const filtrationResult = filterMovies(movies, searchQuery, isCheckboxChecked);
      setFilteredMovies(filtrationResult);
      isFilmsFound(filtrationResult);
      localStorage.setItem('filtrationResult', JSON.stringify(filtrationResult));
      localStorage.setItem('savedQuery',searchQuery);
      localStorage.setItem('checkboxState', JSON.stringify(isCheckboxChecked));
      setIsLoading(false);
    }
  }

  // Поиск по сохранённым фильмам

  const handleSavedMoviesSearchFormSubmit = () => {
    const filtrationResult = filterMovies(savedMovies, searchQuery, isShortMoviesCheckboxChecked);
    setFilteredSavedMovies(filtrationResult);
    isSavedFilmsFound(filtrationResult);
  }

  // Сохранение и удаление фильмов

  const getSavedMovies = () => {
    mainApi.getMyMovies()
    .then((savedMoviesData) => {
      setSavedMovies(savedMoviesData);
    })
    .catch(err => console.log(err))
  }

  const handleSaveMovie = (movie) => {
    mainApi.saveMovie(movie)
    .then(() => {
      getSavedMovies();
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Карточка сохранена!');
      autoCloseInfoTooltip();
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Не удалось сохранить карточку');
      autoCloseInfoTooltip();
      console.log(err)
    })
  }

  const handleDeleteMovie = (movie, isOnSavedPage) => {
    const correctId = isOnSavedPage ? movie.movieId : movie.id;

    const deletedMovie = savedMovies.find((savedMovie) =>  savedMovie.movieId === correctId);

    mainApi.deleteMovie(deletedMovie._id)
    .then(() => {
      const updatedSavedMovies = savedMovies.filter((movie) => movie.movieId !== correctId);
      setSavedMovies(updatedSavedMovies);
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Карточка удалена из сохраненных!');
      autoCloseInfoTooltip();
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true);
      setInfoTooltipText('Не удалось удалить карточку');
      autoCloseInfoTooltip();
      console.log(err)
    });
  }

  // Закрытие тултипа

  const closeInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const autoCloseInfoTooltip = () => {
    setTimeout(() => {
      setIsInfoTooltipOpen(false);
    }, 2000);
  }

  // Получение данных пользователя

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([ mainApi.getUserInfo(), moviesApi.getBeatfilmMovies(), mainApi.getMyMovies() ])
        .then(([currentUser, allMovies, currentUserMovies]) => {
          setCurrentUser(currentUser);
          setMovies(allMovies);
          setSavedMovies(currentUserMovies);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        })
      }
    }, [ isLoggedIn ])

  useEffect(() => {
      if (isLoggedIn) {
      setFilteredSavedMovies(savedMovies)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ savedMovies ])

  // Выход из аккаунта и очистка 

  const signout = () => {
    localStorage.clear();
    setMovies([]);
    setSavedMovies([]);
    setFilteredMovies([]);
    setFilteredSavedMovies([]);
    setSearchQuery('');
    setIsCheckboxChecked(false);
    setIsLoggedIn(false);
    setIsInfoTooltipOpen(true);
    setInfoTooltipText('Будем ждать вас снова! :)');
    autoCloseInfoTooltip();
    auth.logout();
    history.push('/');
  }

  // Локальное хранилище (результаты последнего запроса)

  useEffect(() => {
    if (isLoggedIn) {
      if (localStorage.getItem('filtrationResult')) {
        setFilteredMovies(JSON.parse(localStorage.getItem('filtrationResult')))
      }
      if (localStorage.getItem('savedQuery')) {
        setSearchQuery(localStorage.getItem('savedQuery'))
      }
      if (localStorage.getItem('checkboxState')) {
        setIsCheckboxChecked(JSON.parse(localStorage.getItem('checkboxState')))
      }
    }
  }, [ isLoggedIn ])

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
            filteredMovies={ filteredMovies }
            component={ Movies }
            loggedIn={ isLoggedIn }
            isLoading={ isLoading }
            searchQuery={ searchQuery }
            setSearchQuery={ setSearchQuery }
            isCheckboxChecked={ isCheckboxChecked }
            setIsCheckboxChecked={ setIsCheckboxChecked }
            handleSaveMovie={ handleSaveMovie }
            handleDeleteMovie={ handleDeleteMovie }
            savedMoviesData={ savedMovies }
            handleMoviesSearchFormSubmit={ handleMoviesSearchFormSubmit }
            isMoviesFound={ isMoviesFound }
          />
          <ProtectedRoute
            exact
            path='/saved-movies'
            moviesData={ filteredSavedMovies }
            component={ SavedMovies }
            savedMoviesData={ savedMovies }
            loggedIn={ isLoggedIn }
            isLoading={ isLoading }
            handleDeleteMovie={ handleDeleteMovie }
            searchQuery={ searchQuery }
            setSearchQuery={ setSearchQuery }
            isShortMoviesCheckboxChecked={ isShortMoviesCheckboxChecked }
            setIsShortMoviesCheckboxChecked={ setIsShortMoviesCheckboxChecked }
            handleSavedMoviesSearchFormSubmit={ handleSavedMoviesSearchFormSubmit }
            isSavedMoviesFound={ isSavedMoviesFound }
            />
          <ProtectedRoute
            exact
            path='/profile'
            component={ Profile }
            loggedIn={ isLoggedIn }
            onLogout={ signout }
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