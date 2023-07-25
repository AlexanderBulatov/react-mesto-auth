import React from 'react';
import { SignPage } from './SignPage.js';
import * as auth  from '../auth.js';
import { Link, useNavigate } from 'react-router-dom'; 

export function Register (props) {

  const navigate = useNavigate();

  
  function handleSubmit (email, pass){
      auth.register(pass, email)
      .then((res) => {
        props.hanldeInfoTooltipOk();
        navigate('/sign-in', {replace: true})
        }
      )
      .catch((err) => {
        props.hanldeInfoTooltipError();
        console.log('Register error',err);
      });
  }

  return (
    <SignPage formTitle={'Регистрация'} name={'in'} bttnTitle={'Зарегистрироваться'} onSubmit={handleSubmit}>
      <Link to="/sign-in" className="sign__link">Уже зарегистрированы? Войти</Link>
    </SignPage>
  )
}

