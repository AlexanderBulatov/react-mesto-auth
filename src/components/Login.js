import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import * as auth  from '../utils/auth.js';
import { SignPage } from './SignPage.js';

import { signValidationConfig, signFormValidators } from '../utils/constants.js'
import { FormValidator } from '../utils/FormValidator.js';

export function Login(props) {

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