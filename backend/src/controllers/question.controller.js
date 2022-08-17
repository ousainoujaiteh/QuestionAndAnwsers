'use-strict';

const Question = require('../models/question.model');

exports.findAll = function(req,res){
    Question.findAll(function (err,question){
        console.log('Question Controller');
        if(err){
            console.log('Question Controller error');
        }else {
            console.log('Question Controller Res: ',question);
            res.send(question);
        }
    });
};

exports.create = function (req, res) {
    const new_question = new Question(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Question.create(new_question, function (err, question) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Question added successfully!",
                data: question
            });
        });
    }
};

exports.findById = function (req, res) {
    Question.findById(req.params.id, function (err, question) {
        if (err)
            res.send(err);
        res.json(question);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Question.update(req.params.id, new Question(req.body), function (err, question) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Question successfully updated'
            });
        });
    }
};

exports.delete = function (req, res) {
    Question.delete(req.params.id, function (err, question) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Question successfully deleted'
        });
    });
}