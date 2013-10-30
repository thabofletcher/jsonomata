var omata = require('./omata.js');

if (process.argv.length < 3) {
    console.log("Nothing to execute, quitting.");
    return;
}

omata.call(process.argv.slice(2).join(' '));