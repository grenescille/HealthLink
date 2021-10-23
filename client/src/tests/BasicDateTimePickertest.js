import BasicDateTimePicker from '../components/BasicDateTimePicker';
import { screen, render, getByTestId, fireEvent } from '@testing-library/react';
// import { fireEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';

const dateNow = new RegExp(new Date().toISOString().substr(0, 19).slice(0, 10));

describe('BasicDateTimePicker component', () => {
  test('should render the correct date', () => {
    render(<BasicDateTimePicker />);
    let date = screen.getByTestId('DateTimePickerId');
    let text = screen.getByDisplayValue(dateNow);
    expect(text).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
  // test('change value of input works correctly', () => {
  //   render(<BasicDateTimePicker />);
  //   const inputElement = screen.getByTestId('DateTimePickerId');
  //   fireEvent.change(inputElement, { target: { value: '2021-12-12' } });
  //   expect(inputElement.value).toBe('2021-12-12');
  // });
});
