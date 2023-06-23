/* eslint-disable strict */
import React, { useState } from "react";
import { client } from "../lib/client";
import { calcularPrecoPrazo } from "correios-brasil";
import axios from 'axios';

const Home = ({ products, bannerData, data }) => {

  const [dadosFrete, setDadosFrete] = useState(null)
  const [cepDestino, setCepDestino] = useState(null)
  // let args = {
  //   nCdServico: "04510",
  //   sCepOrigem: "88810020",
  //   sCepDestino: "01305904",
  //   nVlPeso: "0,8",
  //   nCdFormato: "1",
  //   nVlComprimento: "1",
  //   nVlAltura: "1",
  //   nVlLargura: "1",
  //   nVlDiametro: "1",
  // };

  // function testaFrete(args) {
  //   calcularPrecoPrazo(args).then((response) => {
  //     console.log(response);
  //   });
  // }

  const getFrete = async (cepDestino) => {
    if (cepDestino === null) return alert('Informe o cep')
    try {
      const response = await axios.get(`/api/myEndpoint?cepDestino=${cepDestino}`);
      if (response.data.valorpac && response.data.valorsedex === '0,00') return alert('Informe um cep válido')
      setDadosFrete(response.data);
    } catch (error) {
      console.log('Erro ao fazer a requisição:', error);
    }
  };

  // const cep = 01153000


  return (
    <>
      <div className="products-heading">
        <h2>Informe seu CEP!</h2>
        <p>Para o calculo do frete</p>
        <input onChange={(e)=> setCepDestino(e.target.value)}/>
        <button onClick={() => {getFrete(cepDestino)}}>Calcular</button>
      </div>

      <div className="products-container">

        {
          dadosFrete === null ? '' : 
          <div class="table-container">
            <table class="custom-table">
              <tr>
                <th>Serviço</th>
                <th>Valor</th>
                <th>Prazo</th>
                <th></th>
              </tr>
              <tr>
                <td>PAC</td>
                <td>{dadosFrete.valorpac}</td>
                <td>{dadosFrete.prazopac} dias</td>
                <td class="custom-button-container"><button class="custom-button">Ver Detalhes</button></td>
              </tr>
              <tr>
                <td>SEDEX</td>
                <td>{dadosFrete.valorsedex}</td>
                <td>{dadosFrete.prazosedex} dias</td>
                <td class="custom-button-container"><button class="custom-button">Ver Detalhes</button></td>
              </tr>
            </table>
          </div>
                  
        }
        {/* codigo do serviço
        <input type="text" />
        cep de origem
        <input type="text" />
        cep de destino
        <input type="text" />
        peso
        <input type="text" />
        formato
        <input type="text" />
        comprimento
        <input type="text" />
        altura
        <input type="text" />
        largura
        <input type="text" />
        diametro
        <input type="text" /> */}

      </div>

      {/* <div className="products-container">
        <h1>Resultado da Requisição</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div> */}
{/* 
      <button
        onClick={() => {
          getFrete(cepDestino)
        }}
      >
        teste
      </button>
      <button
        onClick={() => {
          console.log(dadosFrete)
        }}
      >
        log
      </button> */}
    </>
  );
};

// export async function getServerSideProps() {
//   const response = await axios.get('https://www.cepcerto.com/ws/json-frete/01001000/20020030/5000');
//   const data = response.data;

//   return {
//     props: {
//       data
//     }
//   };
// }
export default Home;
