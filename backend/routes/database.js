const express = require('express');
const router = express.Router();
const axios = require('axios');
const admin = require('firebase-admin');
// Initialize Firebase Admin SDK


const db = admin.firestore();

router.post('/storeCropData', async (req, res) => {
    try {
        //firebase code
        const cropData = req.body;
        console.log(cropData);
        //firebase storeCropData
        admin.firestore().collection('cropData').doc().set({
            "cropName": cropData.cropName,
            "location": cropData.location,
            "startDate": cropData.startDate,
            "waterFootprint": cropData.waterFootprint,
            "timestamp": cropData.timestamp
        });

        res.send(" Crop data stored successfully");

    } catch (error) {
        console.error(error.message);
    }
});
module.exports = router;