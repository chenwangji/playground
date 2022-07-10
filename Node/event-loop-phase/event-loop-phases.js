const fs = require('fs')

setImmediate(() => console.log(1)) // check
Promise.resolve().then(() => console.log(2)) // micro task
process.nextTick(() => console.log(3)) // micro task
fs.readFile(__filename, () => { // i/o
  console.log(4)
  setTimeout(() => console.log(5)) // timers
  setImmediate(() => console.log(6)) // check
  process.nextTick(() => console.log(7)) // micro task
})
console.log(8) // poll

// 8 2 3 1 4 7 6 5 
// 实际：8 3 2 1 4 7 6 5 

// poll -> check -> timers

