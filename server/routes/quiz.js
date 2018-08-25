const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.post('/', (req, res) => {    
    const query = 'INSERT INTO quiz (name) VALUES (\'' + req.body.data.quizName + '\')';
    pool.connect((err, client, done) => {
        if (err) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query(query, (err, result) => {
                done();
                if (err) {
                    console.log('Error making quiz post query: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM quiz';
    pool.connect((err, client, done) => {
        if (err) {
            console.log('Error connection to database', err);
            res.sendStatus(500);
        } else {
            client.query(query, (err, result) => {
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    console.log('getQuizzes success');
                    res.send(result.rows);
                }
            })
        }
    })
})

module.exports = router;