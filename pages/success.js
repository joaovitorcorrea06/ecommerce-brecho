import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    // localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();

    var storedItems = JSON.parse(localStorage.getItem('product'))
    storedItems.map((value) => {
      const mutations = [{
        createOrReplace: {
          _id: value._id,
          _type: 'product',
          status: 'VENDIDO',
          details: value.details,
          image: value.image,
          name: value.name,
          slug: value.slug,
          price: value.price
        }
      }]

      const teste = (mutations) => {
        fetch(`https://3yun1dl7.api.sanity.io/v2022-09-10/data/mutate/production`, {
        method: 'post',
        headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer skVkmzVFSsgsXMpkfQWdXweJSm0mzN4hE0M5giHyy4BEmzSG8uaYHB6E2NeDYmoa9vs5mRSdSkRFrunMfZV5ywhIZezgPhVfgVbw44LZvZH1ypSV0OuOMnbfVlVzY6x5p7fonb6td6psb5yH1yXWqWaN0S9HlhBwyJbaCpbMo6S43deqbhzJ`
      },
      body: JSON.stringify({mutations})
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error))
       
      }

      teste(mutations)      
    })

    // localStorage.clear()

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
          <button type="button" width="300px" className="btn" >
            Continuar comprando
          </button>
        </a>
      </div>
    </div>
  )
}

export default Success