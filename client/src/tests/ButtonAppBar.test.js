import ButtonAppBar from '../components/ButtonAppBar';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserContextProvider, useUser } from '../context/UserContext';
import { createMemoryHistory } from 'history';
import { Redirect, Router, History, location } from 'react-router-dom';
import '@testing-library/jest-dom';

const user = {
  id: 3,
  isDoctor: false,
  name: 'Hey',
  age: 0,
  email: 'he@h.com',
  username: 'uname',
  password: 'asd',
  stripeid: '1',
  location: '0101000020E610000001000000601502C08FBBC7391FBB4A40',
  peerid: '1',
};

describe('ButtonAppBar component', () => {
  // test('should match the snapshot', () => {
  //   const { container } = render(<ButtonAppBar />);
  //   expect(container.firstChild).toMatchSnapshot();
  // });
  // test('should render button labels', () => {
  //   render(<ButtonAppBar />);
  //   screen.getByText(/Logout/);
  //   screen.getByText(/News/);
  //   screen.getByRole('button', { name: /Logout/i });
  //   screen.getByTestId('NEWS', { name: /News/i });
  // });
  test('should logout correctly', () => {
    const history = createMemoryHistory();
    // jest.mock('react-router-dom', () => {
    //   return { Redirect: jest.fn(({ to }) => `Redirect to ${to}`) };
    // });
    render(
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

    fireEvent.click(logout);
    expect(screen.getByText(/SIGN IN/i)).toBeInTheDocument();
  });
});
