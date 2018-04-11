const express = require('express');
const Question = require('../models/question');
const questionRoutes = express();

questionRoutes.get('/', (req, res) => {
    Question.find((err, questions) => {
        if (err) return res.status(500).send(err);
        return res.send(questions);
    });
});

questionRoutes.post('/', (req, res) => {
    const newQuestion = new Question(req.body);
    newQuestion.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(newQuestion);
    });
});

questionRoutes.put('/:id', (req, res) => {
    Question.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedQuestion) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedQuestion);
    });
});

questionRoutes.delete('/:id', (req, res) => {
    Question.findByIdAndRemove(req.params.id, (err, removedQuestion) => {
        if (err) return res.status(500).send(err);
        return res.status(202).send(removedQuestion);
    });
});

module.exports = questionRoutes;
