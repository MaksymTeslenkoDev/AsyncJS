'use strict';

// Task: rewrite `total` function to be async with JavaScript timers
// Use `setInterval` and `clearInterval` to check next item each 1 second
// Calculations will be executed asynchronously because of timers
// Run `total` twice (as in example below) but in parallel
// Print debug output for each calculation step (each second)
//
// Hint: example output:
// { check: { item: { name: 'Laptop', price: 1500 } } }
// { check: { item: { name: 'Laptop', price: 1500 } } }
// { check: { item: { name: 'Keyboard', price: 100 } } }
// { check: { item: { name: 'Keyboard', price: 100 } } }
// { check: { item: { name: 'HDMI cable', price: 10 } } }
// { check: { item: { name: 'HDMI cable', price: 10 } } }
// { money: 1610 }
// { money: 1610 }

const total = (items,callback) => {
    let result = 0;
    const itemsCoppy = [...items];
    let interval = setInterval(()=>{
        if(itemsCoppy.length === 0) {
            if(interval){
                clearInterval(interval)
                interval = null;
            }
            return callback(null, result);
        };
        const item = itemsCoppy.shift();
        console.log({ check: { item } });
        if (item.price < 0) {
            if(interval){
                clearInterval(interval);
                interval = null;
            }
            return callback(new Error('Negative price is not allowed'));
        }
        result += item.price;
    },1000);
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

total(electronics,(error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});

total(electronics,(error, money) => {
    if (error) console.error({ error });
    else console.log({ money });
});

