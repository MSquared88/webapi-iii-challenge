const express = require('express');

//databases
const userDB = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {

    userDB.insert(req.body)
    .then(user => {
        res.send(201).json(user)
    })
    .catch(err => res.status(400))

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

    userDB.get()
    .then(users => {
        res.status(200).json(users)
    })
});

router.get('/:id', (req, res) => {
    id = req.params.id

    userDB.getById(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => res.status(404))
});

router.get('/:id/posts', (req, res) => {
    const id = req.params.id

    userDB.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => res.status(404))
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
