import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.png';
import logo_cards from '../../assets/trading_cards.png';
import { Context } from '../../context/AuthContext';

import './styles.css';

function TradeUrl() {
  const { register, handleSubmit } = useForm();
  const { signUpTradeUrl } = useContext(Context);
  const [url, setUrl] = useState('');

  function handleTradeUrl({ tradeurl }) {
    signUpTradeUrl(tradeurl);
  }

  useEffect(() => {
    setUrl(localStorage.getItem('trade_url'));
  }, []);

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Trade Cards" />

        <form onSubmit={handleSubmit(handleTradeUrl)}>
          <h1>Cadastre Aqui seu Trade URL</h1>

          <input
            placeholder="Seu Trade URL"
            name="tradeurl"
            {...register('tradeurl')}
            value={url !== 'undefined' ? url : ''}
            onChange={(event) => setUrl(event.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>

          <a
            className="back-link"
            href={`https://steamcommunity.com/id/williansouzatop/tradeoffers/privacy`}
          >
            <FiLogIn size={16} color="#F36600" />
            Não tenho meu Trade URL
          </a>
        </form>
      </section>

      <img src={logo_cards} alt="Trade Cards" />
    </div>
  );
}

export default TradeUrl;
