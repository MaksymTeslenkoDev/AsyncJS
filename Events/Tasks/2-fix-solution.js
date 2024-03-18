'use strict';

// Task: prevent termination on error and fix code
// to prevent withdraw more than given limit

const EventEmitter = require('node:events');

class Purchase extends EventEmitter {
  constructor({ limit }) {
    super();
    this.items = [];
    this.total = 0;
    this.limit = limit;
  }

  addListener(item){
    const total = this.total + item.price;
    if (total > this.limit) {
        this.emit('error', new Error('Limit reached'));
        return;
    }
    this.total = total;
    this.items.push(item);
    this.emit('buy', item);
    console.log({ item, wallet });
  }
}

const wallet = { money: 1600 };
console.log({ wallet });

const purchase = new Purchase({ limit: wallet.money });

purchase.on('add',purchase.addListener);
purchase.on('buy', (item) => {
    wallet.money -= item.price;
    console.log({ item });
});
purchase.on('error', (error) => {
    console.error({ error: error.message});
    purchase.removeAllListeners('add'); 
});

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

for (const item of electronics) {
  purchase.emit('add', item);
}

console.log({ wallet });
console.log({ purchase });