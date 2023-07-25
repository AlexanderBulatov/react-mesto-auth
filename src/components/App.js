import React from 'react';
import {useEffect, useState, useRef } from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { ImagePopup } from './ImagePopup.js'
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js';

import {InfoTooltip} from './InfoTooltip.js'
import { Login } from './Login.js';
import { Register } from './Register.js';
import * as auth  from '../auth.js';
import {ProtectedRoute} from "./ProtectedRoute.js";


function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [modeInfoTooltip, setInfoTooltip] = React.useState({isOpen: false, isOk: true});
  
  const hanldeInfoTooltipOk = ()=>{
    setInfoTooltip({isOpen: true, isOk: true});
  }
  const hanldeInfoTooltipError = ()=>{
    setInfoTooltip({isOpen: true, isOk: false});
  }

  const [userData, setUserData] = React.useState(null);
    // const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isDataLoading, setDataLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({name:'', about: '', avatar:''});

  const [loggedIn, setLoggedIn] = useState(false);

  // const [isEditAvatarPopupOpen, setPopupClose] = React.useState(false);
  const handleError = (err) => {
    console.log(err);
  }

  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [])

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res){
          setLoggedIn(true);
          setUserData(res.data.email);
          navigate("/", {replace: true})
        }
      });
    }
  }

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserData(email);
  }

  const handleLogOff = () => {
    setLoggedIn(false);
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()] )
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        cards.reverse();
        setCards(cards);
      })
      .catch(handleError);
  }, []);
 

  function handleAddPlaceSubmit (place){
    setDataLoading(true);
    api.setCard(place.name, place.link).then((newCard)=>{
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(handleError)
    .finally(() => setDataLoading(false));
  }


  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(handleError);
  }
 
  function handleCardDelete(card) {
    setDeletedCard(card);
  }

  function handleConfirmDelete (card){
    setDataLoading(true);
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((cardFromState) => cardFromState._id !== card._id));
      closeAllPopups();
    })
    .catch(handleError)
    .finally(() => setDataLoading(false));
  }

  function handleUpdateUser (userData){
    setDataLoading(true);
    api.setUserInfo(userData.name, userData.about).then((userDatafromApi)=>{
       setCurrentUser(userDatafromApi);
       closeAllPopups();
     })
     .catch(handleError)
     .finally(() => setDataLoading(false));
  }

  function handleUpdateAvatar({avatar}){
    setDataLoading(true);
    api.setAvatar(avatar).then((userDatafromApi)=>{
       setCurrentUser(userDatafromApi);
       closeAllPopups();
     })
     .catch(handleError)
     .finally(() => setDataLoading(false));
  }



  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true)
  }

  const closeAllPopups = () => {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);

    modeInfoTooltip.isOk ? setInfoTooltip({isOpen: false, isOk:true}):setInfoTooltip({isOpen: false, isOk:false});
    
    setSelectedCard(null);
    setDeletedCard(null);
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page body__content">

        <Header loggedIn={loggedIn} handleLogOff={handleLogOff} userData={userData}/>
        <main className="page__main">
          <Routes>
            {/* <SignPage formTitle={'Вход'} name={'in'} bttnTitle={'Войти'} /> */}
            <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="sign-in" replace />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} hanldeInfoTooltipOk={hanldeInfoTooltipOk} hanldeInfoTooltipError={hanldeInfoTooltipError}/>} />
            <Route path="/sign-up" element={<Register hanldeInfoTooltipOk={hanldeInfoTooltipOk} hanldeInfoTooltipError={hanldeInfoTooltipError} />} />
            <Route path="/" element={<ProtectedRoute 
              element={Main} 
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
      {/* ------------------------------ Add Picture Popap ----------------------------- */}
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isDataLoading} /> 
      {/* ------------------------------ Edit Profile Popap ----------------------------- */}
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isDataLoading} /> 
      {/* ------------------------------ Avatar Popap ----------------------------- */}
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isDataLoading} />
      {/* ------------------------------ Confirm Popap ----------------------------- */}
      <ConfirmDeletePopup card={deletedCard} onClose={closeAllPopups} onConfirmDelete={handleConfirmDelete} isLoading={isDataLoading} />
      {/* ------------------------------ Zoom Popap ----------------------------- */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      {/* ------------------------------ Zoom Popap ----------------------------- */}
      <InfoTooltip mode={modeInfoTooltip} onClose={closeAllPopups} />
      
    </CurrentUserContext.Provider>
  );
}

export default App;
