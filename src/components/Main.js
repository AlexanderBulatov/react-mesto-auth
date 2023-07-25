import React from 'react';
import { Card } from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

export function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
          <section className="profile">
            <div className="profile__foto-wrapper" onClick={props.onEditAvatar}>
              {/* <%=require('./images/JIKusto.jpg')%> */}
              <img src={currentUser.avatar} alt="фотография-аватар" className="profile__foto"/>
            </div>
            <div className="profile__info">
              <div className="profile__name-area">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit" type="button" onClick={props.onEditProfile} ></button>
              </div>
              <p className="profile__occupation">{currentUser.about}</p>
            </div>
            <button className="profile__add-place" type="button" onClick={props.onAddPlace}></button>
          </section>
          <section className="elements">
            {props.cards.map((card)=>(
              <Card key={card._id} 
                card={card} 
                onCardClick={props.onCardClick} 
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </section>
    </>
  )
}