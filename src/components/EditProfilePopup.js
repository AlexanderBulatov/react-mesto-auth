import React from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


export function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({name: name, about: description});

  } 


  return (
    <PopupWithForm name="profile" formTitle="Редактировать профиль" bttnTitle={props.isLoading ? 'Сохранение...': 'Сохранить' } 
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit} >
      <input
        id="name"
        type="text"
        name="profile-name"
        placeholder="Введите имя"
        className="popup__input popup__input_type_name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        value={name}
        loading={props.loading}
      />
      <span className="popup__error popup__error_type_name"></span>

      <input
        id="occupation"
        type="text"
        name="profile-occupation"
        placeholder="Введите род занятий"
        className="popup__input popup__input_type_occupation"
        required
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        value={description}
      />
      <span className="popup__error popup__error_type_occupation"></span>
    </PopupWithForm>
  )
}