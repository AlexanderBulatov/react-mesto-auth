import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignPage } from './SignPage.js';
import * as auth from '../utils/auth.js';

import { signValidationConfig, signFormValidators } from '../utils/constants.js'
import { FormValidator } from '../utils/FormValidator.js';

export function Register(props) {

  useEffect(() => {
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
  }, []);




  const navigate = useNavigate();


  function handleSubmit(email, pass) {
    auth.register(pass, email)
      .then((res) => {
        props.hanldeInfoTooltipOk();
        navigate('/sign-in', { replace: true })
      }
      )
      .catch((err) => {
        props.hanldeInfoTooltipError();
        console.log('Register error', err);
      });
  }

  return (
    <SignPage formTitle={'Регистрация'} name={'in'} bttnTitle={'Зарегистрироваться'} onSubmit={handleSubmit}>
      <Link to="/sign-in" className="sign__link">Уже зарегистрированы? Войти</Link>
    </SignPage>
  )
}

