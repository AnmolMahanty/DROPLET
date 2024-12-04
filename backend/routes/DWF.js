const express = require('express');
const questionnaire = require('../storedData/questionnaireData');
const router = express.Router();

router.get('/message', (req,res) => {
    res.json({ message: "Hello from the server!" });
});
router.get('/questions', (req,res) => {
    res.json(questionnaire);
});

module.exports = router;