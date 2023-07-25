import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

export function Card(props){
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const elementLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`); 

  
  function handleClick() {
    props.onCardClick(props.card);
  } 
  function handleLikeClick() {
    props.onCardLike(props.card);
  } 
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  } 

  return(
    <article className="element">
      <img src={props.card.link} alt={props.card.name} className="element__foto" onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__rate">
          <button className={elementLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <h3 className="element__counter">{props.card.likes.length}</h3>
        </div>
      </div>
      {isOwn && <button className="element__delete" type="button" onClick={handleDeleteClick}></button>}
    </article>
  )
}
