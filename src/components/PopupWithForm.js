import { validationConfig, formValidators } from '../utils/constants.js'
import { FormValidator } from '../utils/FormValidator.js';

export function PopupWithForm(props) {
  
  // const enableValidationForms = (config) => {
  //   const formList = Array.from(document.querySelectorAll(config.formSelector))
  //   formList.forEach((formElement) => {
  //     const validator = new FormValidator(config, formElement)
  //     const formName = formElement.getAttribute('name')
  //     formValidators[formName] = validator;
  //     validator.enableValidation();
  //   });
  // };
  
  // enableValidationForms(validationConfig);


  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.formTitle}</h2>
        <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>

          {props.children}

          <button type="submit" className="popup__submit-btn">
            {props.bttnTitle}
          </button>

        </form>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}