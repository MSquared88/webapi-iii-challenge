const express = require('express');
const server = express();


//routes
const userRoute = require('./users/userRouter')
const postsRoute = require('./posts/postRouter')

//middleware
server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`
  <h2>Matthew's Middleware!</h2>

  <p>The /users  endpoint will return a list of users<p>
  <p>The /posts  endpoint will return a list of Posts by the users<p>
  <p>The /posts/{the post id}  endpoint will return that post by the id<p>
  <p>The /users/{the users id}  endpoint will return that user<p>
  <p>The /users/{the users id}/posts  endpoint will return that users posts<p>
  `)
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
