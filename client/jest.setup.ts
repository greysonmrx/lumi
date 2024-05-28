import "@testing-library/jest-dom";

class ResizeObserver {
  cb: any;

  constructor(cb: any) {
    this.cb = cb;
  }
  observe(cb: any) {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
global.ResizeObserver = ResizeObserver;
