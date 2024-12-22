const express = require('express');
const router = express.Router();
const axios = require('axios');
const {admin:adminObj} = require('./auth');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK


const db = getFirestore();

router.post('/storeCropData', async (req, res) => {
    try {
        //firebase code
        const cropData = req.body;
        console.log(cropData);
        //firebase storeCropData
        db.collection('cropData').doc().set({
            "cropName": cropData.cropName,
            "location": cropData.location,
            "startDate": cropData.startDate,
            "waterFootprint": cropData.waterFootprint,
            "timestamp": cropData.timestamp
        });

        res.status(200).send(" Crop data stored successfully");

    } catch (error) {
        console.error(error);
    }
});
module.exports = router;