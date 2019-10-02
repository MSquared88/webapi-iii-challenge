const express = require('express');
const server = express();


//routes
const userRoute = require('./users/userRouter')

server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use('/users', userRoute)


//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} [${new Date().toISOString()}]`)
  next()
};

const port = 8000

server.listen(port, console.log(`\n Server listening on port ${port}`))

module.exports = server;
