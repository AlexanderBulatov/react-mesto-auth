import { validationConfig, formValidators } from '../utils/constants.js'
import { FormValidator } from '../utils/FormValidator.js';

import allRight from '../images/icon-ok.svg';
import somethinWrong from '../images/icon-error.svg';

export function InfoTooltip(props) {
  
  return (
  <div className={`info-tooltip ${props.mode.isOpen ? 'info-tooltip_opened': ''} `}> 
    <div className="info-tooltip__container">
    
      <img src={props.mode.isOk ? allRight : somethinWrong} alt="инфографика" className="info-tooltip__icon"/>
      <h2 className="info-tooltip__title">
        {`${props.mode.isOk ? 'Вы успешно зарегистрировались!': 'Что-то пошло не так! Попробуйте еще раз.'}`}
      </h2>
      <button className="info-tooltip__close" type="button" onClick={props.onClose}></button>
    </div>
  </div>
  )
}