const express = require('express');
const Question = require('../models/question');
const questionRoutes = express();

questionRoutes.get('/', (req, res) => {
    Question.find((err, questions) => {
        if (err) return res.status(500).send(questions);
        if (questions.length !== 0) {
            if (err) return res.status(500).send(questions[0]);
            return res.send(questions);
        } else {
            if (err) return res.status(500).send(questions);
            return res.send(questions);
        }
    });
});

questionRoutes.post('/', (req, res) => {
    Question.find((err, questions) => {
        if (err) return res.status(500).send(questions);
        if (questions.length !== 0) {
            const updatedQuestion = questions[0];
            for (key in Object.keys(req.body)) {
                updatedQuestion[key] = req.body[key]
            }
            if (err) return res.status(500).send(updatedQuestion);
            return res.send(updatedQuestion);
        } else {
            const newQuestion = new Question(req.body);
            newQuestion.save(err => {
                if (err) return res.status(500).send(err);
                return res.status(201).send(newQuestion);
            });
        }
    });
});

module.exports = questionRoutes;
