'use strict';

// Task: rewrite `total` method from callbacks to async method

class Basket {
  #items = null;

  constructor(items) {
    this.#items = items;
  }

  total(callback) {
    let result = 0;
    for (const item of this.#items) {
      if (item.price < 0) {
        callback(new Error('Negative price is not allowed'));
        return;
      }
      result += item.price;
    }
    callback(null, result);
  }
}

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const basket = new Basket(electronics);
basket.total((error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});