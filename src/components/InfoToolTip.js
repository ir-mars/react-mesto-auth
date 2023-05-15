import React from 'react';
import { useEffect, useState } from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoToolTip ({ isOpen, onClose, status }) {
  const [content, setContent] = useState({image: '', text: ''});

  useEffect(() => {
    if (status) {
      setContent({image: success, text: 'Вы успешно зарегистрировались!'})
    }
    if (!status) {
      setContent({image: fail, text: 'Что-то пошло не так! Попробуйте еще раз.'})
    }
  }, [status])
    return(
      <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>  
        <div className="popup__container">
          <button className="popup__close-btn" type="button" onClick={onClose}></button>
          <h2 className="popup__title popup__title_tooptip">{content.title}</h2>
          <img className="popup__tooltip-img" src={content.image} alt={content.text} />
        </div>      
      </div>
    )
}
export default InfoToolTip;