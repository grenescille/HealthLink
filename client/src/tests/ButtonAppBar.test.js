import ButtonAppBar from '../components/ButtonAppBar';
import {
  screen,
  render,
  queryByAttribute,
  fireEvent,
} from '@testing-library/react';
import { UserContextProvider } from '../context/UserContext';
import { Redirect, Router } from 'react-router-dom';
import { userAuth, setUserAuth } from '../context/UserContext';

describe('ButtonAppBar component', () => {
  test('should match the snapshot', () => {
    const { container } = render(<ButtonAppBar />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render button labels', () => {
    render(<ButtonAppBar />);
    screen.getByText(/Logout/);
    screen.getByText(/News/);
    screen.getByRole('button', { name: /Logout/i });
    screen.getByTestId('NEWS', { name: /News/i });
  });
  test('should logout correctly', () => {
    render(
      <UserContextProvider>
        <Router>
          <ButtonAppBar />
        </Router>
      </UserContextProvider>
    );
    const logout = screen.getByTestId('logout');
    fireEvent.click(logout);
    expect(logout.value).toBe(<Redirect to="/login" />);
  });
});
