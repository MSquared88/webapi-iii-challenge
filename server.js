const express = require('express');
const server = express();


//routes
const userRoute = require('./users/userRouter')
const postsRoute = require('./posts/postRouter')

//middleware
server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//routes
server.use('/users', userRoute)
server.use('/posts', postsRoute)



//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} [${new Date().toISOString()}]`)
  next()
};





module.exports = server;
