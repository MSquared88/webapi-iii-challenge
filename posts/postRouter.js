const express = require('express');

const postDB = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
    postDB.get()
    .then(posts => {
        res.status(200).json(posts)
    })
});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id

    postDB.getById(id) 
    .then(post => {
        res.status(200).json(post)
    })
});

router.delete('/:id', validatePostId,(req, res) => {
    const id = req.params.id 

    postDB.remove(id)
    .then(deletedPost => {
        res.status(200).json(deletedPost)
    })
    .catch(err => res.status(500).json(err))
});

router.put('/:id', validatePostId,(req, res) => {
    const id = req.params.id
    const changes = req.body

    postDB.update(id, changes)
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => res.status(500).json(err))
});

// custom middleware

function validatePostId(req, res, next) {
    id = req.params.id

    postDB.getById(id)
    .then(post => {
        if(!post){
            res.status(400).json({ message: "invalid post id" })
        }
        else{
            next()
        }
    })

};

module.exports = router;