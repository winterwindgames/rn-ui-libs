module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-native-reanimated|@expo/vector-icons)',
  ],
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/*.test.tsx', '**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.types.ts',
    '!src/**/index.ts',
    '!src/test-utils.tsx',
  ],
};
