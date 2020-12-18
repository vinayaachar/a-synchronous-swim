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
  // res.writeHead(200, headers);

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end()
    next()
  }

  if (req.method === 'GET') {
    console.log('URL:', req.url)
    if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, content) => {
        if (err) {
          res.writeHead(404, headers);
          res.end(err);
          next()
        } else {
          res.writeHead(200, headers);
          res.end(content);
          next();
        }
      })
    } else if (req.url === 'spec/missing.jpg') {
      res.writeHead(404, headers);
      res.end();
    } else {
      res.writeHead(200, headers);
      var firstMessage = messageQueue === null ? 'EMPTY' : messageQueue.dequeue()
      res.write(firstMessage);
      res.end();
      next();
    }
  }
};
