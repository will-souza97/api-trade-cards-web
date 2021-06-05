import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.png';
import logo_cards from '../../assets/trading_cards.png';
import { Context } from '../../context/AuthContext';

import './styles.css';

function Signin() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(Context);

  function handleSignIn({ steamid }) {
    signIn(steamid);
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Trade Cards" />

        <form onSubmit={handleSubmit(handleSignIn)}>
          <h1>Faça seu Login Aqui</h1>

          <input
            placeholder="Sua ID da Steam ou Username"
            name="steamid"
            {...register('steamid')}
          />

          <button className="button" type="submit">
            Entrar
          </button>

          <a
            className="back-link"
            href={`https://store.steampowered.com/join/?&snr=1_60_4__62`}
          >
            <FiLogIn size={16} color="#F36600" />
            Não tenho cadastro
          </a>
        </form>
      </section>

      <img src={logo_cards} alt="Trade Cards" />
    </div>
  );
}

export default Signin;
