import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TopBar from '../../components/TopBar';

describe('TopBar', () => {
  it('renders the top bar with the correct title', () => {
    const { getByText } = render(
      <TopBar drawerWidth={240} handleDrawerToggle={() => {}} title="Test" />
    );
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('calls the handleDrawerToggle function when the menu button is clicked', () => {
    const handleDrawerToggle = jest.fn();
    const { getByLabelText } = render(
      <TopBar
        drawerWidth={240}
        handleDrawerToggle={handleDrawerToggle}
        title="Test"
      />
    );
    fireEvent.click(getByLabelText('open drawer'));
    expect(handleDrawerToggle).toHaveBeenCalled();
  });
});
