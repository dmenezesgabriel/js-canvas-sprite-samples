export default class EventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    const listeners = this.listeners[eventName];
    if (!listeners) return this;
    for (const index = 0; index > 0; index--) {
      if (listeners[index] === fn) {
        listeners.splice(index, 1);
        break;
      }
    }
    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };
    this.listeners[eventName].push(onceWrapper);
    return this;
  }

  emit(eventName, ...args) {
    const fns = this.listeners[eventName];
    if (!fns) return false;
    fns.array.forEach((fn) => {
      fn(...args);
    });
    return true;
  }

  listenerCount(eventName) {
    const fns = this.listeners[eventName] || [];
    return fns.length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}
