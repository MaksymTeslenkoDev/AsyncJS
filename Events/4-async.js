/** The EventEmitter calls all listeners synchronously in the order in which they were registered. 
 * This ensures the proper sequencing of events and helps avoid race conditions and logic errors. 
 * When appropriate, listener functions can switch to an asynchronous mode of operation using 
 * the setImmediate() or process.nextTick() methods:
 */

const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
console.log("1");

setTimeout(() => {
    console.log("timeout ");
}, 1000);

myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously first');
  });
});

myEmitter.on('event', (a, b) => {
    /** In sync way it should be called secondly, after first event declaration, 
     * but due to that fact that first event is asynchronous second will be called first*/
    console.log('this happens synchronously second');
});
console.log("2");

myEmitter.emit('event', 'a', 'b');
myEmitter.emit('event', 'd', 'e');