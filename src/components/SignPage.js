import React from 'react';
import {useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { signValidationConfig, signFormValidators } from '../utils/constants.js'
import { FormValidator } from '../utils/FormValidator.js';

export function SignPage (props) {

  //------------- control component lifecycle
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;

    return () => {
        mounted.current = false;
    };
}, []);
  //------------- component lifecycle


  const enableValidationForms = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement)
      const formName = formElement.getAttribute('name')
      signFormValidators[formName] = validator;
      validator.enableValidation();
    });
  };
  
  enableValidationForms(signValidationConfig);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePassChange(e) {
    setPass(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    props.onSubmit(email, pass);
  }

  return (
    <div className={`sign page__sign sign_type_${props.name} `}>

      <h2 className="sign__title">{props.formTitle}</h2>
      <form className="sign__form" name={props.name} noValidate onSubmit={handleSubmit}>

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="sign__input sign__input_type_email"
          required
          onChange={handleEmailChange}
          value={email}
          //loading={props.loading}
        />
        <span className="sign__error sign__error_type_email"></span>

        <input
          id="pass"
          type="password"
          name="pass"
          placeholder="Пароль"
          className="sign__input sign__input_type_pass"
          required
          minLength="2"
          maxLength="200"
          onChange={handlePassChange}
          value={pass}
        />
        <span className="sign__error sign__error_type_pass"></span>

        <button type="submit" className="sign__submit-btn">
          {props.bttnTitle}
        </button>
      </form>

      {props.children}
      
    </div>
  )
}