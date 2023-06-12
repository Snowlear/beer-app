import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../../views/404';

describe('NotFound', () => {
  it('renders the not found page with the correct text', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Page not found')).toBeInTheDocument();
    expect(
      getByText("We haven't found what you've been looking for")
    ).toBeInTheDocument();
  });
});