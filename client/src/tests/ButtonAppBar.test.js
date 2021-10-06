import ButtonAppBar from '../components/ButtonAppBar';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserContextProvider, useUser } from '../context/UserContext';
import { createMemoryHistory } from 'history';
import { Redirect, Router, History, location } from 'react-router-dom';
import { renderHook, act } from '@testing-library/react';
import { renderWithRouter } from './hepler';

import '@testing-library/jest-dom';

describe('ButtonAppBar component', () => {
  test('should match the snapshot', () => {
    const { container } = render(
      <UserContextProvider>
        <ButtonAppBar />)
      </UserContextProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render button labels', () => {
    render(
      <UserContextProvider>
        <ButtonAppBar />)
      </UserContextProvider>
    );
    screen.getByText(/Logout/);
    screen.getByText(/News/);
    screen.getByRole('button', { name: /Logout/i });
    screen.getByTestId('NEWS', { name: /News/i });
  });
  test('should logout correctly', async () => {
    const history = createMemoryHistory();
    // console.log(userAuth);
    renderWithRouter(
      <UserContextProvider>
        <Router history={history}>
          <ButtonAppBar />
        </Router>
      </UserContextProvider>
    );

    expect(screen.getByText(/News/i)).toBeInTheDocument();

    const logout = screen.getByTestId('logout');

    // const fireE =
    const leftClick = { button: 0 };

    userEvent.click(logout, leftClick);

    expect(await screen.findByText(/sign/i)).toBeInTheDocument();
  });
});
