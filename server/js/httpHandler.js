const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  res.writeHead(200, headers);
  if (req.method === 'GET' && req.url === '/') {
    //set the random string
    // var direction = ['left', 'right', 'up', 'down'];
    // var str = direction[Math.floor(Math.random() * direction.length)];
    var firstMessage = messageQueue.dequeue();
    console.log('first message', firstMessage);
    res.write(firstMessage);
  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
