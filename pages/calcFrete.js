import React from "react";
import { client } from "../lib/client";
import { calcularPrecoPrazo } from "correios-brasil";

const Home = ({ products, bannerData }) => {
  let args = {
    nCdServico: "04510",
    sCepOrigem: "88810020",
    sCepDestino: "01305904",
    nVlPeso: "0,8",
    nCdFormato: "1",
    nVlComprimento: "1",
    nVlAltura: "1",
    nVlLargura: "1",
    nVlDiametro: "1",
  };

  function testaFrete(args) {
    calcularPrecoPrazo(args).then((response) => {
      console.log(response);
    });
  }
  return (
    <>
      <div className="products-heading">
        <h2>Informe seu CEP!</h2>
        <p>Para o calculo do frete</p>
      </div>

      <div className="products-container">
        codigo do serviço
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
        <input type="text" />
      </div>

      <button
        onClick={() => {
          testaFrete(args);
        }}
      >
        teste
      </button>
    </>
  );
};

export default Home;
