import React from 'react';

const InfoTooltip = ({ isOpen, infoTooltipText, onClose }) => {

  React.useEffect(() => {
    setTimeout(() => {
        onClose(false);
    }, 5000);
}, []);

  return (
    <article className= { `tooltip ${ isOpen ? "tooltip_active" : '' }` } name="tooltip" onClick={ onClose }>
      <div className="tooltip__container">
        <h2 className="tooltip__message">{ infoTooltipText }</h2>
      </div>
    </article>
  )
}

export default InfoTooltip;