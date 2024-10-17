import '@testing-library/jest-dom';
import '@testing-library/user-event';

global.ResizeObserver = class ResizeObserver {
    callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
    }

    observe(target: Element) {
        this.callback([], this);
    }

    unobserve() {}

    disconnect() {}
};
