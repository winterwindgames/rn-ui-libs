import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { PortalProvider, Portal } from './Portal';

describe('Portal', () => {
  it('renders provider with children', () => {
    const { getByText } = render(
      <PortalProvider><Text>App Content</Text></PortalProvider>
    );
    expect(getByText('App Content')).toBeTruthy();
  });

  it('renders portal content', () => {
    const { getByText } = render(
      <PortalProvider>
        <Text>Main</Text>
        <Portal><Text>Portal Content</Text></Portal>
      </PortalProvider>
    );
    expect(getByText('Main')).toBeTruthy();
    expect(getByText('Portal Content')).toBeTruthy();
  });
});
