const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../storedData/firebaseAdminKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Google Sign-In route
router.post('/signin', async (req, res) => {
    const { idToken } = req.body;

    try {
        // Verify the Google ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Create a custom token for the user
        const customToken = await admin.auth().createCustomToken(uid);

        res.json({ customToken });
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(500).json({ error: 'Failed to verify ID token' });
    }
});

module.exports = router;