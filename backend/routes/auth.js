const express = require('express');
const router = express.Router();
const { initializeApp, cert} = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const path = require('path');

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, '../storedData/firebaseAdminKey.json');

// Initialize Firebase Admin SDK
const serviceAccount = require('../storedData/firebaseAdminKey.json');

initializeApp({
    credential: cert(serviceAccount),
});

// Google Sign-In route
router.post('/signin', async (req, res) => {
    const { idToken } = req.body;

    try {
        // Verify the Google ID token
        const decodedToken = await getAuth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Create a custom token for the user
        const customToken = await getAuth().createCustomToken(uid);

        res.json({ customToken });
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(500).json({ error: 'Failed to verify ID token' });
    }
});

module.exports = router;