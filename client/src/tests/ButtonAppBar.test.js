import ButtonAppBar from '../components/ButtonAppBar';
import { screen, render, queryByAttribute } from '@testing-library/react';

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
});
