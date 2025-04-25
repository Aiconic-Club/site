// Import necessary testing libraries
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock environment variables that might be used in tests
process.env = {
  ...process.env,
  // Add any environment variables needed for tests here
  NODE_ENV: 'test',
};

// Silence console errors and warnings in tests
global.console = {
  ...console,
  // Uncomment to disable console.error in tests
  // error: jest.fn(),
  // Uncomment to disable console.warn in tests
  // warn: jest.fn(),
};