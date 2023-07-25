export function ImagePopup (props){
  return(
    <div className={`popup popup_type_picture ${props.card ? 'popup_opened': ''}`} >
        <div className="popup__zooming">
          <img src={props.card ? props.card.link: ''} alt={props.card ? props.card.name: ''} className="popup__picture" />
          <h2 className="popup__picture-caption">{props.card ? props.card.name: ''}</h2>
          <button className="popup__close" type="button" onClick={props.onClose} ></button>
        </div>
      </div>
  )
}