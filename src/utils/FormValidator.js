export class FormValidator {
  constructor (validationConfig, popupForm){
    this._popupForm = popupForm;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formInputs = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this._submitBttn = this._popupForm.querySelector(this._submitButtonSelector);
  }

  enableValidation(){
    this._setFormInputsListener();
  }

  _setFormInputsListener(){
    this._toggleBttnValidity();
    this._formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleBttnValidity();
      });
    });
  }

  _toggleBttnValidity(){
    if (this._existInvalidInput()) {
      this.disableSubmitBttn();
    }
    else {
      this.enableSubmitBttn();
    }
  }

  _existInvalidInput(){
    return this._formInputs.some((input) => {
      return !input.validity.valid;
    })
  }

  enableSubmitBttn () {
    this._submitBttn.classList.remove(this._inactiveButtonClass);
    this._submitBttn.removeAttribute('disabled','');
  }

  disableSubmitBttn (){
    this._submitBttn.classList.add(this._inactiveButtonClass);
    this._submitBttn.setAttribute('disabled','');
  }

  _isValid(input){
    if (input.validity.valid) {
        this._hideInputError(input);
    }
    else {
        this._showInputError(input, input.validationMessage);
    }
  }

  _hideInputError(input){
    const errorElement = this._getErrorElement (input);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError(input, errorMessage){
    const errorElement = this._getErrorElement (input);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _getErrorElement(input){
    return (this._inputSelector.includes('popup')) ? 
      this._popupForm.querySelector(`.popup__error_type_${input.id}`):
      this._popupForm.querySelector(`.sign__error_type_${input.id}`);
  }

  clearError(){
    this._formInputs.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
