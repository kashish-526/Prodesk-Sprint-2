/**
 * PRODESK IT — eventbus.js
 * Sprint 2 · Phase 3: Custom Publish-Subscribe Event Emitter
 *
 * Decouples application logic from the DOM.
 * Usage:
 *   EventBus.on('theme:change', handler)
 *   EventBus.emit('theme:change', { theme: 'dark' })
 *   EventBus.off('theme:change', handler)
 */

'use strict';

class PubSub {
  constructor() {
    /** @type {Object.<string, Function[]>} */
    this._events = {};
  }

  /**
   * Subscribe to an event.
   * @param {string}   event    - Event name (e.g. 'theme:change')
   * @param {Function} listener - Callback to invoke
   * @returns {Function} Unsubscribe function (call it to clean up)
   */
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('[EventBus] listener must be a function');
    }
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(listener);

    // Return unsubscribe fn so callers can remove without holding a ref separately
    return () => this.off(event, listener);
  }

  /**
   * Subscribe to an event exactly once — auto-removed after first emit.
   * @param {string}   event
   * @param {Function} listener
   */
  once(event, listener) {
    const wrapper = (data) => {
      listener(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  /**
   * Unsubscribe a listener from an event.
   * @param {string}   event
   * @param {Function} listener
   */
  off(event, listener) {
    if (!this._events[event]) return;
    this._events[event] = this._events[event].filter(fn => fn !== listener);
    // Clean up empty arrays
    if (this._events[event].length === 0) {
      delete this._events[event];
    }
  }

  /**
   * Emit an event, calling all registered listeners with optional data.
   * @param {string} event
   * @param {*}      [data]
   */
  emit(event, data) {
    if (!this._events[event]) return;
    // Shallow copy to avoid issues if a listener calls off() during iteration
    [...this._events[event]].forEach(fn => fn(data));
  }

  /**
   * Remove ALL listeners for an event, or every listener if no event given.
   * @param {string} [event]
   */
  clear(event) {
    if (event) {
      delete this._events[event];
    } else {
      this._events = {};
    }
  }

  /**
   * Debug helper — returns list of active event names.
   * @returns {string[]}
   */
  activeEvents() {
    return Object.keys(this._events);
  }
}

// Singleton global bus
const EventBus = new PubSub();