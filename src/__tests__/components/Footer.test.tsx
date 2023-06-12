import React from 'react';
import { render, screen  } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders the footer with the correct text', () => {
    render(<Footer />);
    expect(screen.getByText('© 2023')).toBeInTheDocument();
  });
});
