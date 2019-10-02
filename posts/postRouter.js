const express = require('express');

const postDB = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
    postDB.get()
    .then(posts => {
        res.status(200).json(posts)
    })
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;