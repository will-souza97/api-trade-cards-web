import React, { useContext, useEffect, useState } from 'react';
import { FiPower, FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { Context } from '../../context/AuthContext';
import api from '../../services/api';

import './styles.css';

function Dashboard() {
  const { signOut, url } = useContext(Context);

  const [listCards, setListCards] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: cards } = await api.get('/user');

      setListCards(cards);
    })();
  }, [url]);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('cards'));

    setListCards(cards);
  }, []);

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Trade Cards" />
        <span></span>

        <Link className="button" to="/tradeurl">
          Cadastrar Trade Url
        </Link>
        <button type="button" onClick={signOut}>
          <FiPower size={18} color="#f36600" />
        </button>
      </header>

      <h1>Cartas Encontradas</h1>

      <ul>
        {listCards.map((card) => (
          <li key={card.cardid}>
            <div className="group">
              <img src={card.icon_url} alt="icon" />
              <div>
                {' '}
                <strong>NAME:</strong>
                <p>{card.name}</p>
                <strong>DESCRIÇÃO:</strong>
                <p>Carta Colecionavel do Jogo {card.game}</p>
                <button
                  type="button"
                  onClick={() =>
                    window.location.assign(
                      JSON.parse(localStorage.getItem('trade_url'))
                    )
                  }
                >
                  <FiSend size={20} color="#f36600" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
