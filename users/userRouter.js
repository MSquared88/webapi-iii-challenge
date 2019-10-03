const express = require('express');

//databases
const userDB = require('./userDb')
const postsDB = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {

    userDB.insert(req.body)
    .then(user => {
        res.send(201).json(user)
    })
    .catch(err => res.status(500).json(err))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const newPost = req.body

    postsDB.insert(newPost)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => res.status(500).json(err))
});

router.get('/', (req, res) => {

    userDB.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json(err))
});

router.get('/:id', validateUserId, (req, res) => {
    id = req.params.id

    userDB.getById(id)
    .then(user => {
        res.status(200).json(user)
    })
});

router.get('/:id/posts', (req, res) => {
    const id = req.params.id

    userDB.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => res.status(404))
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id

    userDB.remove(id)
    .then(dbRes => {
        res.status(200).json({message: 'removed user'})
    })
    .catch(err => console.log(err))
});

router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id
    const changes = req.body

    userDB.update(id, changes)
    .then(dbRes => {
        res.status(200).json(dbRes)
    })
    .catch(err => console.log(err))
});

//custom middleware

function validateUserId(req, res, next) {
    id = req.params.id

    userDB.getById(id)
    .then(dbRes => {
        if(!dbRes){
            res.status(400).json({ message: "invalid user id" })
        }else{
            next()
        }
    })
    .catch(err => res.status(500))
};

function validateUser(req, res, next) {
    const newUser = req.body
    if(!Object.values(newUser).length){
        res.status(400).json({ message: "missing user data" })
    }
    else if(!newUser.name) {
        res.status(400).json({ message: "missing required name field" })
    }
    else{
        next()
    }
};

function validatePost(req, res, next) {
    const post = req.body
    
    if(!Object.values(post).length){
        res.status(400).json({ message: "missing post data" })
    }
    else if(!post.text){
        res.status(400).json({ message: "missing required text field" })
    }
    else {
        next()
    }

};

module.exports = router;
