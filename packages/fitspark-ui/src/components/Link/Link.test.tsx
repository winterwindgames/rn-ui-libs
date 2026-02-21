import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Link } from './Link';
import { TestWrapper } from '../../test-utils';

describe('Link', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Link>Click here</Link></TestWrapper>
    );
    expect(getByText('Click here')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Link testID="link">L</Link></TestWrapper>
    );
    expect(getByTestId('link')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Link>L</Link></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Link>L</Link></TestWrapper>);
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Link onPress={onPress}>Tap</Link></TestWrapper>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Link onPress={onPress} disabled>Tap</Link></TestWrapper>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders underline variants', () => {
    const underlines = ['always', 'hover', 'none'] as const;
    underlines.forEach((underline) => {
      render(<TestWrapper><Link underline={underline}>L</Link></TestWrapper>);
    });
  });
});
