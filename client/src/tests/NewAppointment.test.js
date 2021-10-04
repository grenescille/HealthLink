import NewAppointment from '../components/NewAppointment';
import { screen, render, queryByAttribute } from '@testing-library/react';
import { useUser } from '../context/UserContext';
import { UserContextProvider } from '../context/UserContext';
import { Route, Switch, Router, useHistory } from 'react-router-dom';

describe('NewAppointment rendering correctly', () => {
  test('should render the map', () => {
    let history = useHistory();
    const { getByText } = render(
      <UserContextProvider>
        <Router>
          <NewAppointment />
        </Router>
      </UserContextProvider>
    );
    screen.getByText(/Logout/);
    screen.getByText(/News/);
    // expect(container.firstChild).toMatchSnapshot();
  });
});
