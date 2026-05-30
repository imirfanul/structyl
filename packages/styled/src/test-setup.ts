import '@testing-library/jest-dom';

// ResizeObserver polyfill — floating-ui uses it for Popover positioning in jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
