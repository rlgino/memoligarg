import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Memo Liga Argentina title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Memo Liga Argentina/i);
  expect(linkElement).toBeInTheDocument();
});
