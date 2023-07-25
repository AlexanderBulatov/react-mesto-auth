export const validationConfig = {
  formSelector: '.popup__form',                                     //'.popup__form',
  inputSelector: '.popup__input',                                   //'.popup__input',
  submitButtonSelector: '.popup__submit-btn',                       //'.popup__button',
  inactiveButtonClass: 'popup__submit-btn_disable',                 //'popup__button_disabled',
  inputErrorClass: 'popup__input_error',                            //'popup__input_type_error',
  errorClass: 'popup__error_active'                                 //'popup__error_visible'
}

export const signValidationConfig = {
  formSelector: '.sign__form',                                     //'.sign__form',
  inputSelector: '.sign__input',                                   //'.sign__input',
  submitButtonSelector: '.sign__submit-btn',                       //'.sign__button',
  inactiveButtonClass: 'sign__submit-btn_disable',                 //'sign__button_disabled',
  inputErrorClass: 'sign__input_error',                            //'sign__input_type_error',
  errorClass: 'sign__error_active'                                 //'sign__error_visible'
}

export const formValidators = {};
export const signFormValidators = {};

export const popupInputName = document.querySelector('.popup__input_type_name');
export const popupInputOccupation = document.querySelector('.popup__input_type_occupation');
export const popupInputAvatar = document.querySelector('.popup__input_type_avatar');

export const profileEditBttn = document.querySelector('.profile__edit');
export const placeAddBttn = document.querySelector('.profile__add-place');

export const avatar = document.querySelector('.profile__foto-wrapper');
