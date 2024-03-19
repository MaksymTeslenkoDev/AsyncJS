'use strict';

const { EventEmitter, on } = require('node:events');

const purchase = new EventEmitter({ captureRejections: true });
(async () => {
  const electronics = [
    { name: 'Laptop', price: 1500 },
    { name: 'Keyboard', price: -100 },
    { name: 'HDMI cable', price: 10 },
  ];

  process.nextTick(() => {
    for (const item of electronics) {
      purchase.emit('add', item);
    }
  });

  const iterator = on(purchase, 'add');

  purchase.on('error', async (err) => {
    console.log({ error: err.message });
  });

  try {
    for await (const item of iterator) {
      console.log({ item: item[0] });
      if (item[0].price < 0) {
        throw new Error('Negative price');
      }
    }
  } catch (err) {
    purchase.emit('error', err);
  }
})();
