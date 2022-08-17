'use-strict';

const Choice = require('../models/choice.model');

exports.findAll = function(req,res){
    Choice.findAll(function (err,choice){
        console.log('Choice Controller');
        if(err){
            console.log('Choice Controller error');
        }else {
            console.log('Choice Controller Res: ',choice);
            res.send(choice);
        }
    });
};

exports.create = function (req, res) {
    const new_choice = new Choice(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Choice.create(new_choice, function (err, choice) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Choice added successfully!",
                data: choice
            });
        });
    }
};

exports.findById = function (req, res) {
    Choice.findById(req.params.id, function (err, choice) {
        if (err)
            res.send(err);
        res.json(choice);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Choice.update(req.params.id, new Choice(req.body), function (err, choice) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Choice successfully updated'
            });
        });
    }
};

exports.delete = function (req, res) {
    Choice.delete(req.params.id, function (err, choice) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Choice successfully deleted'
        });
    });
}