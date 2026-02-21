import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Portal, PortalProvider } from './Portal';

describe('Portal', () => {
  it('renders provider', () => {
    render(
      <PortalProvider><Text>Content</Text></PortalProvider>
    );
  });

  it('renders portal content', () => {
    const { getByText } = render(
      <PortalProvider>
        <Portal><Text>Portal Content</Text></Portal>
      </PortalProvider>
    );
    expect(getByText('Portal Content')).toBeTruthy();
  });

  it('renders named portal', () => {
    const { getByText } = render(
      <PortalProvider>
        <Portal name="test"><Text>Named</Text></Portal>
      </PortalProvider>
    );
    expect(getByText('Named')).toBeTruthy();
  });
});
