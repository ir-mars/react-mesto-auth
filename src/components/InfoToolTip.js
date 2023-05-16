import React from 'react';

function InfoToolTip ({ isOpen, onClose, text, image }) {
  
  return(
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_is-opened" : ""}`}>  
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}>
        </button>
        <h2 className="popup__title">{text}</h2>
        <img
          className="popup__tooltip-img"
          src={image}
          alt={text} />
      </div>      
    </div>
  )
}
export default InfoToolTip;