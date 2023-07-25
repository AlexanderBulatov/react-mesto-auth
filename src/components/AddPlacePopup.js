import React from 'react';
import { PopupWithForm } from './PopupWithForm.js';


export function AddPlacePopup (props) {
  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [props.isOpen]);
  
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');
  
  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }
//-------------------SUBMIT--------------
  function handleSubmit (e){
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({name: placeName, link: placeLink});
  }
//============================================
  return (
    <PopupWithForm name="add-picture" formTitle="Новое место" bttnTitle={props.isLoading ? 'Загрузка...': 'Сохранить' } 
    isOpen={props.isOpen} 
    onClose={props.onClose}
    onSubmit={handleSubmit}>
        <input
          id="caption" 
          type="text"
          name="picture-caption"
          placeholder="Название"
          className="popup__input popup__input_type_caption"
          required
          minLength="2"
          maxLength ="30"
          onChange={handlePlaceNameChange}
          value={placeName}
          loading={props.loading}
        />
        <span className="popup__error popup__error_type_caption"></span>

        <input
          id="link"
          type="url"
          name="picture-link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_link"
          required
          onChange={handlePlaceLinkChange}
          value={placeLink}
        />
        <span className="popup__error popup__error_type_link"></span>
      </PopupWithForm>
  )
}