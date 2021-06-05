import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';
import history from '../services/history';

const Context = createContext({});

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function signIn(steamid) {
    const { data } = await api.post('/user', { username: steamid });
    const { data: listCards } = await api.get('/user');

    localStorage.setItem('token', JSON.stringify(data.accessToken));
    localStorage.setItem('cards', JSON.stringify(listCards));
    localStorage.setItem('trade_url', JSON.stringify(data.user.trade_url));

    setUrl(data.user.trade_url);

    api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
    setAuthenticated(true);

    history.push('/dashboard');
  }

  async function signOut() {
    api.defaults.headers.Authorization = undefined;
    localStorage.clear();
    setAuthenticated(false);
    history.push('/');
  }

  async function signUpTradeUrl(url) {
    await api.put('/tradeurl', { trade_url: url });
    localStorage.setItem('trade_url', JSON.stringify(url));
    setUrl(url);

    history.push('/dashboard');
  }

  return (
    <Context.Provider
      value={{
        authenticated,
        url,
        signIn,
        signOut,
        signUpTradeUrl,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
