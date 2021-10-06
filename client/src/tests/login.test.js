import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { UserContextProvider } from '../context/UserContext';
import SignUp from '../components/SignUp';
import EntrySignIn from '../components/EntrySignIn';
import { renderWithRouter } from './hepler';

test('redirected to register', async () => {
  const history = createMemoryHistory();
  renderWithRouter(
    <UserContextProvider>
      <Router history={history}>
        <App />
        {/* <Switch>
          <Route exact path="/login">
            <EntrySignIn />
          </Route>
          <Route exact path="/register">
            <SignUp />
          </Route>
        </Switch> */}
      </Router>
    </UserContextProvider>
  );
  const leftClick = { button: 0 };
  const linkToRegister = screen.getByTestId('registerLink');

  userEvent.click(linkToRegister, leftClick);

  expect(screen.getByTestId('register-container')).toBeInTheDocument();
});
