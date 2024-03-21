'use strict';

// Task: change `iterate` contract from chainable callbacks
// to Promise (chainable or you can call it with await syntax)

const iterate = (items) => {
  let index = 0;
  const chain = {
    next: (callback) => {
      return new Promise((resolve, reject) => {
        if (index < items.length) {
          const item = items[index];
          if (item.price < 0) {
            reject('Negative price is not allowed');
          }
          callback(items[index++]);
        }
        resolve(chain);
      });
    },
  };
  return chain;
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

(async () => {
  try {
    const chain = iterate(electronics);
    await chain.next(console.log);
    await chain.next(console.log);
    await chain.next(console.log);
  } catch (error) {
    console.error({ error });
  }
})();

// Promise.resolve(iterate(electronics))
//   .then((chain) => {
//     return chain.next(console.log);
//   })
//   .then((chain) => {
//     return chain.next(console.log);
//   })
//   .then((chain) => {
//     return chain.next(console.log);
//   })
//   .catch((error) => {
//     console.error({ error });
//     return;
//   });
