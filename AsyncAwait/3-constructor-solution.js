'use strict';

// Task: rewrite class Basket to class Total with async constructor
// Constructor call example:
//   const total = await new Total(electronics);
//   console.log({ total });

class Total {
  #items = null;

  constructor(items) {
    return new Promise((resolve, reject) => {
      this.#items = items;
      let result = 0;
      for (const item of this.#items) {
        if (item.price < 0) {
          reject(new Error('Negative price is not allowed'));
          return;
        }
        result += item.price;
      }
      resolve(result);
    });
  }
}

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: -10 },
];

(async () => {
    try{
        const total = await new Total(electronics);
        console.log({ total });
    }catch(err){
        console.error({ error: err.message });
    }
})();
