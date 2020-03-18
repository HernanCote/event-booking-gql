import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';

import NavBar from './components/NavBar/NavBar';

import './App.css';
import AuthContext from './context/auth-context';
import AuthPage from './pages/auth';
import BookingsPage from './pages/bookings';
import EventsPage from './pages/events';

const MainContent = styled.main`
  margin: 4rem 2.5rem;
`;

function App() {

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, expiration) => {
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
  };

  return (
    <BrowserRouter>
      <>
        <AuthContext.Provider value={{ token, userId, login, logout }}>
          <NavBar />
          <MainContent>
            <Switch>
              {token && <Redirect from="/" to="/events" exact />}
              {token && <Redirect from="/auth" to="/events" exact />}
              {!token && <Route path="/auth" component={AuthPage} />}
              <Route path="/events" component={EventsPage} />
              {token && <Route path="/bookings" component={BookingsPage} />}
              {!token && <Redirect to="/auth" />}
            </Switch>
          </MainContent>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
}

export default App;
