const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// router.post('/', (req, res) => {    
//     const query = 'INSERT INTO quiz (name) VALUES (\'' + req.body.data.quizName + '\')';
//     pool.connect((err, client, done) => {
//         if (err) {
//             console.log('Error connecting to database', err);
//             res.sendStatus(500);
//         } else {
//             client.query(query, (err, result) => {
//                 done();
//                 if (err) {
//                     console.log('Error making quiz post query: ', err);
//                     res.sendStatus(500);
//                 } else {
//                     res.sendStatus(201);
//                 }
//             });
//         }
//     });
// });

//   quizzes: [
//     {
//        id: '',
//       name: '',
//       type: '',
//       questions: [
//         {
//           text: '',
//           correct_answer: '',
//           a: ''
//         }
//       ]
//     }
//   ]
// }


router.post('/', (req, res) => {
    const { name, type } = req.body.data
    const quizQuery = 'INSERT INTO quiz (name, type) VALUES ($1, $2) RETURNING quiz_id'
    const values = [name, type]

    pool.connect((err, client, done) => {
        if (err) {
            console.log('Error connecting to database', err)
            res.sendStatus(500)
        } else {
            client.query(quizQuery, values, (err, result) => {
                done();
                if (err) {
                    console.log('Error making quiz post query: ', err)
                    res.sendStatus(500);
                } else {
                    console.log(result)
                    res.send(result)
                }
            })
        }
    })
})

// question sample req.body.data
// { data: 
//     { quiz_id: 11,
//       name: 'cities',
//       type: 'multiple choice',
//       questions: [ [Object], [Object] ],
//       question: { text: 'fdsa', correct_answer: 'a', a: 'fdsa' } } }

router.post('/question', (req, res) => {
    console.log('req.body');
    console.log(req.body);

    const question = req.body.data
    const questionArray = []
    questionArray.push(question)
    // createMultipleChoiceQuery accepts an array argument
    const questionQueryObj = createMultipleChoiceQuery(questionArray)

    // UPDATE books SET author=‘Sussanna Clarke’ WHERE id=2;
    pool.connect((err, client, done) => {
        if (err) {
            console.log('Error connecting to database', err)
            res.sendStatus(500)
        } else {
            client.query(questionQueryObj, (err, result) => {
                done();
                if (err) {
                    console.log('Error making question post query: ', err)
                    res.sendStatus(500);
                } else {
                    console.log(result)
                    res.send(result)
                }
            })
        }
    })
})

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
                    //res.send(result.rows);
                    const quizzesList = result.rows

                    //add questions
                    pool.connect((err, client, done) => {
                        // replace with a left join
                        const questionQuery = 'SELECT * FROM quiz JOIN multiple_choice_questions ON quiz.quiz_id = multiple_choice_questions.quiz_id;';
                        if (err) {
                            console.log('Error connecting to database', err)
                            res.sendStatus(500)
                        } else {
                            client.query(questionQuery, (err, result) => {
                                done();
                                if (err) {
                                    console.log('Error making quiz post query: ', err)
                                    res.sendStatus(500);
                                } else {
                                    console.log('get questions success')
                                    // res.send(result)
                                    const questions = result.rows
                                    const quizzes = {};
                                    quizzesList.forEach((quiz, i) => {
                                        quizzes[quiz.quiz_id] = {
                                            quiz_id: quiz.quiz_id,
                                            name: quiz.name,
                                            type: quiz.type,
                                            questions: []
                                        }
                                    })
                                    const alphabet = []
                                    for (let i = 97; i < 97 + 26; i++) {
                                        const nextLetter = String.fromCharCode(i)
                                        alphabet.push(nextLetter)
                                    }
                                    // handle all answers a, b, c etc

                                    questions.forEach((row, j) => {
                                        const question = {
                                            text: row.text,
                                            correct_answer: row.correct_answer
                                        }
                                        for (let letter of alphabet) {
                                            if (row[letter]) {
                                                if (row[letter].length > 0) {
                                                    question[letter] = row[letter]
                                                }
                                            }
                                        }
                                        quizzes[row.quiz_id].questions.push(question)
                                    })
                                    const quizzesArray = [];
                                    for (key in quizzes) {
                                        quizzesArray.push(quizzes[key])
                                    }
                                    console.log('quizzes')
                                    console.log(quizzesArray)
                                    res.send(quizzesArray)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.delete('/', (req, res) => {
    const { quiz_id } = req.query;
    // console.log(req.query);
    const deleteQuery = 'DELETE from quiz WHERE quiz_id=' + quiz_id + ';'

    pool.connect((err, client, done) => {
        if (err) {
            console.log('Error connecting to database', err)
            res.sendStatus(500)
        } else {
            client.query(deleteQuery, (err, result) => {
                done();
                if (err) {
                    console.log('Error making delete quiz query: ', err)
                    res.sendStatus(500);
                } else {
                    console.log(result)
                    res.send(result)
                }
            })
        }
    })
})

router.put('/', (req, res) => {
    const { name, quiz_id } = req.body.data
    console.log('req.body.data: ')
    console.log(req.body.data);
    
    const quizQuery = `UPDATE quiz SET name=($1) WHERE quiz_id=($2)`
    const values = [name, quiz_id]
    // client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
    // [data.text, data.complete, id]);
    pool.connect((err, client, done) => {
        if (err) {
            console.log('Error connecting to database', err)
            res.sendStatus(500)
        } else {
            client.query(quizQuery, values, (err, result) => {
                done();
                if (err) {
                    console.log('Error making quiz update query: ', err)
                    res.sendStatus(500);
                } else {
                    console.log(result)
                    res.send(result)
                }
            })
        }
    })
})

function createMultipleChoiceQuery(rows) {
    console.log('rows', rows);

    const values = []
    const columns = []
    let longestRowIndex = 0
    let longestRowLength = rows[0]
    // get row most columns (more answer choices) > this will be the property list
    rows.forEach((row, i) => { // each row is one question object
        const rowLength = Object.keys(row).length
        if (rowLength > longestRowLength) {
            longestRowLength = rowLength
            longestRowIndex = i
        }
    })
    const longestRow = rows[longestRowIndex]
    const propertyList = '(' + Object.keys(longestRow).join(', ') + ')'
    rows.forEach((row, i) => { // each row is one question object

        const valueClause = [] // $1, $2
        Object.keys(longestRow).forEach((property, j) => { // the property of the question object: text, correct_answer...
            if (j < Object.keys(row).length) {
                values.push(row[property])
            } else {
                // fill in extra spots will ''
                values.push('')
            }
            valueClause.push('$' + values.length) // [($1, $2...), ($3, $4, ...)] for each question
        })
        columns.push('(' + valueClause.join(', ') + ')')
    })
    return {
        text: 'INSERT INTO multiple_choice_questions ' + propertyList + ' VALUES ' + columns.join(', '),
        values: values
    }
}
// Query object format: 
// {
//     text: 'INSERT INTO multiple_choice_questions (name, type) VALUES ($1, $2, $3, $4, $5, $6), ($3, $4...)'
//     values: ['How old are you?', '10 years old', '1 years old', '4 years old', '8 years old', '2 years old'...]
// }

module.exports = router;