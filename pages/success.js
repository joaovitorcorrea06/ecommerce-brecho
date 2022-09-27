import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Obrigado pela compra!</h2>
        <p className="email-msg">Verifique seu e-mail para a confirmação de pagamento</p>
        <p className="description">
          Qualquer dúvida me envie um e-mail
          <a className="email" href="mailto:order@example.com">
            emaildabeatriz@example.com
          </a>
        </p>
        <a href="/">
          <button type="button" width="300px" className="btn">
            Continuar comprando
          </button>
        </a>
      </div>
    </div>
  )
}

export default Success