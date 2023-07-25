import React from 'react';
import { PopupWithForm } from './PopupWithForm.js';


export function EditAvatarPopup(props) {
  const refInputAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: refInputAvatar.current.value });
  }


  React.useEffect(() => {
    refInputAvatar.current.value = '';
  }, [props.isOpen]);
  
  return (
    <PopupWithForm name="avatar" formTitle="Обновить аватар" bttnTitle={props.isLoading ? 'Сохранение...': 'Сохранить' }
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit} 
      loading={props.loading}>
      <input
        ref={refInputAvatar}
        id="avatar"
        type="url"
        name="avatar-link"
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_type_avatar"
        required
      />
      <span className="popup__error popup__error_type_avatar"></span>
    </PopupWithForm>
  )
}