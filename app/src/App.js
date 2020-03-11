import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import styled from 'styled-components';

import NavBar from './components/NavBar/NavBar';

import './App.css';

import AuthPage from './pages/auth';
import BookingsPage from './pages/bookings';
import EventsPage from './pages/events';

const MainContent = styled.main`
  margin: 4rem 2.5rem;
`;

function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <MainContent>
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/bookings" component={BookingsPage} />
          </Switch>
        </MainContent>
      </>
    </BrowserRouter>
  );
}

export default App;
