const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

const port = 8000

server.listen(port, console.log(`\n Server listening on port ${port}`))

module.exports = server;
