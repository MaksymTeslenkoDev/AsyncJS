'use strict';

const total = (items, cb) => {
  let result = 0;
  for (const item of items) {
    result += item.price;
  }
  return cb(result);
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const print = (money) => {
  console.log({ money });
};
// Use new signature total(electronics, (money) => ...)
total(electronics, print);