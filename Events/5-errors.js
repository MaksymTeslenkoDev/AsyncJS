/** If an EventEmitter does not have at least one listener registered for the 'error' event, 
 * and an 'error' event is emitted, the error is thrown, a stack trace is printed, 
 * and the Node.js process exits. */

const {EventEmitter, errorMonitor} = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
// myEmitter.emit('error', new Error('whoops!'));

/** As a best practice, listeners should always be added for the 'error' events. */

myEmitter.on('error', (err) => {
    console.error('whoops! there was an error');
  });
myEmitter.emit('error', new Error('whoops!'));
