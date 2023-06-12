import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProvider, useAppContext } from '../../context/appContext';

describe('AppProvider', () => {
  test('renders children and provides the context values', () => {
    const ChildComponent = () => {
      const appContext = useAppContext();
      return (
        <div>
          <span>Has Change: {appContext.hasChange.toString()}</span>
          <span>Data Statistics: {JSON.stringify(appContext.dataStatistics)}</span>
        </div>
      );
    };

    render(
      <AppProvider>
        <ChildComponent />
      </AppProvider>
    );

    // Test that the children are rendered
    expect(screen.getByText('Has Change: true')).toBeInTheDocument();

    // Test that the context values are provided correctly
    expect(screen.getByText('Data Statistics: {"per_page":50,"total":0}')).toBeInTheDocument();
  });
});

// Add more tests for other functionality provided by the AppContext component
