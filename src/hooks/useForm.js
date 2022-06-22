import React from 'react';

//хук управления формой
function useForm() {

  const [ name, setName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const [ nameError, setNameError ] = React.useState('');
  const [ emailError, setEmailError ] = React.useState('');
  const [ passwordError, setPasswordError ] = React.useState('');

  const handleNameChange = (e) => {
    const regExName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
      e.target.value
    );
    if (e.target.value.length < 2) {
      setNameError('Длина не может быть менее 2-х символов');
    } else if (e.target.value.length > 30) {
      setNameError('Длина не может быть более 30-ти символов');
    } else if (!regExName) {
      setNameError('Разрешены только латиница, кириллица, пробел и дефис')
    } else {
      setNameError('');
    }
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      e.target.value
    );
    if (!regExEmail) {
      setEmailError('Неверный формат почты');
    } else {
      setEmailError('');
    }
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    if (e.target.value < 6) {
      setPasswordError('Пароль должен содержать не менее 6-ти символов');
    } else {
      setPasswordError('');
    }
    setPassword(e.target.value)
  }

  return { 
    name, setName, handleNameChange, nameError, setNameError,
    email, setEmail, handleEmailChange, emailError, setEmailError,
    password, setPassword, handlePasswordChange, passwordError, setPasswordError
    }
}

export default useForm;