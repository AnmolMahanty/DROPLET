//send axios call to api to test getdata function

const testData = {
    answers: {
        0: "Broccoli",
        1: "Mumbai",
        2: "2023-01-10",
        3: "Drip Irrigation",
        4: "1000",
        5: "5",
        6: "10",
        7: "5",
        8: "3",
        9: "Every 3 Days",
        10: "Every 2 Days",
        11: "Once a Week"
    }
}
const express = require('express');
const router = express.Router();
const axios = require('axios');

async function runTest() {
    try {
        const response = await axios.post('http://localhost:5000/api/getdata', testData);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Call the async function to run the test
runTest();

module.exports = router;