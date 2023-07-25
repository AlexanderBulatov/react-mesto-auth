import React from 'react';
import { PopupWithForm } from './PopupWithForm.js';

export function ConfirmDeletePopup(props) {

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onConfirmDelete(props.card);

  } 

  return (
    <PopupWithForm name="confirm" formTitle="Вы уверены?" bttnTitle={props.isLoading ? 'Удаление...': 'Да' }
      isOpen={props.card} 
      onClose={props.onClose}
      onSubmit = {handleSubmit}
      loading={props.loading} />
  )
}