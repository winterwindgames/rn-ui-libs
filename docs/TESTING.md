# Testing Guide

Every component in every library must have tests. Tests are the contract that ensures components work correctly across theme changes, prop variations, and user interactions.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Jest** | Test runner |
| **@testing-library/react-native** | Component rendering & querying |
| **jest-expo** | Expo-compatible Jest preset |

No E2E/Detox — our tests focus on unit and component-level behavior that runs fast in CI.

---

## File Structure

```
packages/<library-name>/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   ├── Button.test.tsx      ← co-located test
│   │   │   └── index.ts
│   │   ├── ...
│   ├── theme/
│   │   ├── ThemeProvider.test.tsx    ← theme tests
│   │   └── ...
├── jest.config.js
├── jest.setup.js
└── package.json                      ← test scripts + devDeps
```

Tests are **co-located** with their component — `Button.test.tsx` lives next to `Button.tsx`.

---

## Test Categories

### 1. Render Tests
Every component must render without crashing, with default props and with all prop combinations.

```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from './Button';
import { TestWrapper } from '../../test-utils';

describe('Button', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button label="Press me" />
      </TestWrapper>
    );
    expect(getByText('Press me')).toBeTruthy();
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'ghost', 'link'] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <TestWrapper>
          <Button label={variant} variant={variant} />
        </TestWrapper>
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByText } = render(
        <TestWrapper>
          <Button label={size} size={size} />
        </TestWrapper>
      );
      expect(getByText(size)).toBeTruthy();
    });
  });
});
```

### 2. Interaction Tests
Every interactive component must test user actions — press, toggle, input, etc.

```tsx
import { render, fireEvent } from '@testing-library/react-native';

it('calls onPress when pressed', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <TestWrapper>
      <Button label="Tap" onPress={onPress} />
    </TestWrapper>
  );
  fireEvent.press(getByText('Tap'));
  expect(onPress).toHaveBeenCalledTimes(1);
});

it('does not call onPress when disabled', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <TestWrapper>
      <Button label="Tap" onPress={onPress} disabled />
    </TestWrapper>
  );
  fireEvent.press(getByText('Tap'));
  expect(onPress).not.toHaveBeenCalled();
});
```

### 3. State Tests
Components with internal state (Switch, Checkbox, Accordion, etc.) must test state changes.

```tsx
it('toggles value on press', () => {
  const onToggle = jest.fn();
  const { getByRole } = render(
    <TestWrapper>
      <Switch value={false} onToggle={onToggle} />
    </TestWrapper>
  );
  fireEvent.press(getByRole('switch'));
  expect(onToggle).toHaveBeenCalledWith(true);
});
```

### 4. Accessibility Tests
Every component must have correct accessibility attributes.

```tsx
it('has correct accessibility props', () => {
  const { getByRole } = render(
    <TestWrapper>
      <Button label="Save" />
    </TestWrapper>
  );
  const button = getByRole('button');
  expect(button).toBeTruthy();
  expect(button.props.accessibilityLabel).toBe('Save');
});

it('reports disabled state to accessibility', () => {
  const { getByRole } = render(
    <TestWrapper>
      <Button label="Save" disabled />
    </TestWrapper>
  );
  const button = getByRole('button');
  expect(button.props.accessibilityState.disabled).toBe(true);
});
```

### 5. Theme Tests
Components must work in both light and dark themes.

```tsx
it('renders in light theme', () => {
  const { getByText } = render(
    <TestWrapper scheme="light">
      <Button label="Light" />
    </TestWrapper>
  );
  expect(getByText('Light')).toBeTruthy();
});

it('renders in dark theme', () => {
  const { getByText } = render(
    <TestWrapper scheme="dark">
      <Button label="Dark" />
    </TestWrapper>
  );
  expect(getByText('Dark')).toBeTruthy();
});
```

### 6. testID Tests
Every component must forward the `testID` prop.

```tsx
it('passes testID', () => {
  const { getByTestId } = render(
    <TestWrapper>
      <Button label="Test" testID="my-button" />
    </TestWrapper>
  );
  expect(getByTestId('my-button')).toBeTruthy();
});
```

### 7. Style Override Tests
Every component must accept and apply the `style` prop.

```tsx
it('applies style override', () => {
  const { getByTestId } = render(
    <TestWrapper>
      <Button label="Styled" testID="btn" style={{ marginTop: 99 }} />
    </TestWrapper>
  );
  const btn = getByTestId('btn');
  const flatStyle = Array.isArray(btn.props.style)
    ? Object.assign({}, ...btn.props.style.flat())
    : btn.props.style;
  expect(flatStyle).toMatchObject({ marginTop: 99 });
});
```

---

## TestWrapper Utility

Every library ships a `src/test-utils.tsx` file:

```tsx
import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { PortalProvider } from './components/Portal';

interface TestWrapperProps {
  children: React.ReactNode;
  scheme?: 'light' | 'dark';
}

export const TestWrapper: React.FC<TestWrapperProps> = ({
  children,
  scheme = 'dark',
}) => (
  <ThemeProvider initialScheme={scheme}>
    <PortalProvider>
      {children}
    </PortalProvider>
  </ThemeProvider>
);
```

---

## Per-Component Test Checklist

Every component test file **MUST** cover:

| # | Test | Required For |
|---|------|-------------|
| 1 | Renders without crashing (default props) | All components |
| 2 | Renders all variants | Components with `variant` prop |
| 3 | Renders all sizes | Components with `size` prop |
| 4 | Handles press/interaction | Interactive components |
| 5 | Respects `disabled` prop | Interactive components |
| 6 | Handles `loading` state | Button, IconButton |
| 7 | Correct accessibility role | All components |
| 8 | Correct accessibility state | Interactive components |
| 9 | Forwards `testID` | All components |
| 10 | Applies `style` override | All components |
| 11 | Renders in light theme | All components |
| 12 | Renders in dark theme | All components |
| 13 | State change callbacks | Stateful components (Switch, Checkbox, etc.) |
| 14 | Visibility toggle | Overlay components (Modal, Drawer, Menu, etc.) |
| 15 | Content rendering | Components with children/content (Card, Accordion, Tabs) |

---

## Configuration

### jest.config.js

```javascript
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-native-reanimated)',
  ],
  setupFilesAfterSetup: ['./jest.setup.js'],
  testMatch: ['**/*.test.tsx', '**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.types.ts',
    '!src/**/index.ts',
    '!src/test-utils.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### jest.setup.js

```javascript
// Mock react-native-reanimated
require('react-native-reanimated').setUpTests();

// Silence Reanimated warnings in tests
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve()),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
}));
```

### package.json scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --reporters=default"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "jest-expo": "~52.0.0",
    "@testing-library/react-native": "^12.0.0",
    "@testing-library/jest-native": "^5.0.0",
    "@types/jest": "^29.0.0"
  }
}
```

---

## Running Tests

```bash
# Run all tests for a library
cd packages/<library-name>
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Run tests for a specific component
npx jest Button

# Run from monorepo root (both libraries)
npm test --workspaces
```

---

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Test file | `ComponentName.test.tsx` | `Button.test.tsx` |
| Describe block | Component name | `describe('Button', () => {...})` |
| Test name | Starts with verb | `it('renders with default props')` |
| Mock file | `__mocks__/module.ts` | `__mocks__/expo-haptics.ts` |

---

## CI Integration

Tests run on every push via GitHub Actions:

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        package: [grind-ui, fitspark-ui]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
        working-directory: packages/${{ matrix.package }}
      - run: npm test -- --ci --coverage
        working-directory: packages/${{ matrix.package }}
```

---

## What NOT to Test

- ❌ Animation values (Reanimated shared values are mocked)
- ❌ Exact pixel colors/sizes (brittle, theme-dependent)
- ❌ Internal implementation details (test behavior, not structure)
- ❌ Third-party library internals (Reanimated, Expo modules)
- ✅ DO test that components render, respond to interaction, and expose correct accessibility
