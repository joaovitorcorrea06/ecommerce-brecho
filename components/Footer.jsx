
import React from 'react';
import { AiFillInstagram, AiOutlineWhatsApp} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Lojinha do João All rights reserverd</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineWhatsApp />
      </p>
    </div>
  )
}

export default Footer