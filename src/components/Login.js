import React from 'react';
import {useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import * as auth  from '../auth.js';
import { SignPage } from './SignPage.js';

export function Login (props) {
  
// const mounted = useRef(false);
// useEffect(() => {
//     mounted.current = true;
//     console.log('Login mount');

//     return () => {
//         mounted.current = false;
//         console.log('Login unmount');
//     };
// }, []);


  const navigate = useNavigate();

  function handleSubmit (email, pass){
    if (!pass || !email){
      return;
    }
    auth.authorize(email, pass)
      .then((data) => {
        if (data.token){
          props.handleLogin(email);
          //props.hanldeInfoTooltipOk();
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        console.log('Login Erorr:',err);
        props.hanldeInfoTooltipError();
      });
}
  return (
    <SignPage formTitle={'Вход'} name={'in'} bttnTitle={'Войти'} onSubmit={handleSubmit}>
      <div className="sign__link"></div>
    </SignPage>
  )
}