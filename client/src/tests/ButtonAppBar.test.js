import ButtonAppBar from '../components/ButtonAppBar';
import { screen, render, fireEvent } from '@testing-library/react';
import { UserContextProvider, useUser } from '../context/UserContext';
import { Redirect, Router, History, location } from 'react-router-dom';

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
    render(
      <UserContextProvider>
        {/* <Router> */}
        <ButtonAppBar />
        {/* </Router> */}
      </UserContextProvider>
    );
    const logout = screen.getByTestId('logout');
    fireEvent.click(logout);
    expect(logout.value).toBe(<Redirect to="/login" />);
  });
});
