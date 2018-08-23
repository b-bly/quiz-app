var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.post('/', function (req, res) {
    console.log('quiz post');
    console.log(req.body);
    
    var query = 'INSERT INTO quiz (name) VALUES (\'' + req.body.data.quizName + '\')';
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query(query, function (err, result) {
                    done();
                    if (err) {
                        console.log('Error making quiz post query: ', err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                }
            );
        }
    });
});

module.exports = router;