import '@testing-library/jest-dom';

// setupTests.ts or setupTests.js
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem(key: string): string | null {
          return store[key] || null;
        },
        setItem(key: string, value: string): void {
          store[key] = value.toString();
        },
        removeItem(key: string): void {
          delete store[key];
        },
        clear(): void {
          store = {};
        },
      };
    })(),
    writable: true,
  });
});