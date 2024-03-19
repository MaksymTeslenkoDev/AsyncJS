'use strict';

// Task: capture error 'Negative price'
// Hint: use EventEmitter { captureRejections: true }

/**
 * The captureRejections option in the EventEmitter constructor or the global setting change this behavior,
 * installing a .then(undefined, handler) handler on the Promise.
 * This handler routes the exception asynchronously to the Symbol.for('nodejs.rejection') method
 * if there is one, or to 'error' event handler if there is none.
 */

const EventEmitter = require('node:events');

const purchase = new EventEmitter({ captureRejections: true });

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: -100 },
  { name: 'HDMI cable', price: 10 },
];

purchase.on('add', async (item) => {
  console.log({ item });
  if (item.price < 0) {
    throw new Error('Negative price');
  }
});

purchase.on('error', (err) => {
  console.log({ error: err.message });
});
// purchase[Symbol.for('nodejs.rejection')] = (err)=>console.log(err.message);

for (const item of electronics) {
  purchase.emit('add', item);
}
