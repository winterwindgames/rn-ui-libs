import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { PortalProvider } from './components/Portal';

interface TestWrapperProps {
  children: React.ReactNode;
  scheme?: 'light' | 'dark';
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ children, scheme = 'dark' }) => (
  <ThemeProvider initialScheme={scheme}>
    <PortalProvider>{children}</PortalProvider>
  </ThemeProvider>
);
