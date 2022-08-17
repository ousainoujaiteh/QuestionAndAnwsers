const express = require('express')
const router = express.Router()
const authJwt  = require('../middleware/authJwt');
const userController = require('../controllers/user.controller');
const choiceController = require('../controllers/choice.controller');
const questionController = require('../controllers/question.controller');

// Question Routes
router.get('/questions', questionController.findAll);

// Create a new question
router.post('/questions/create', questionController.create);

// Retrieve a single question with id
router.get('/questions/:id', questionController.findById);

// Update a question with id
router.put('/questions/:id', questionController.update);

// Delete a question with id
router.delete('/questions/:id', questionController.delete);

// Choice Routes
// Retrieve all choice
router.get('/choices',[authJwt.verifyToken], choiceController.findAll);

// Create a new choice
router.post('/choices/create', choiceController.create);

// Retrieve a single choice with id
router.get('/choices/:id', choiceController.findById);

// Update a choice with id
router.put('/choices/:id', choiceController.update);

// Delete a choice with id
router.delete('/choices/:id', choiceController.delete);


// User routes
router.post('/users/create',userController.create);

router.post('/users/login',userController.login);

module.exports = router