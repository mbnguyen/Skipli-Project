// --------------------------------------------------------------------------------
// File: BackEnd.js
// Project: Skipli Project
// Description: This programs simulate the verifying phone number process.
//              Using React Node.js for front end.
//              Using Express for back end.
//              Using Firebase Firestore for database.
//              Using Twilio for texting.
// Programmer: Minh Nguyen
// Last modified: 10/30/2020
// --------------------------------------------------------------------------------

// Config Express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4041;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Initialize FireStore
const admin = require('firebase-admin');
admin.initializeApp();

// Identifiers
const identifiers = {
    POST_CREATE_NEW_ACCESS_CODE: '/create-new-access-code',
    POST_VALIDATE_ACCESS_CODE: '/validate-access-code'
};

// This function listens for a request to create a new access code
// Return:
//      accessCode as Json
app.post(identifiers.POST_CREATE_NEW_ACCESS_CODE, async (req, res) => {

    const firebase = require('./Firebase');

    // Create a random 6-digit access code
    let accessCode = 0;
    for (i = 0; i < 6; i++) {
        accessCode = accessCode * 10 + Math.floor(Math.random() * Math.floor(9));
    }

    // Write it to the database
    const result = await firebase.writeUserData(admin, req.body.phoneNumber, accessCode)
    let returnValue;
    if (result != null) {

        // If successfully written to the database
        // Send the access code to the user via SMS
        const sms = require('./SendSms');
        let phoneNumber = '+1' + req.body.phoneNumber;
        const isSent = sms.sendSms(accessCode.toString(), phoneNumber);

        // Check if sent successfully
        if (isSent) {

            // If success, return the access code
            returnValue = JSON.stringify({accessCode: accessCode.toString()});
        } else {

            // If failed, return 0 as an access code
            returnValue = JSON.stringify({accessCode: 0});
        }
    } else {

        // Failed to write to the database, return 0 as an access code
        returnValue = JSON.stringify({accessCode: 0});
    }
    res.send(returnValue);
});

// This function listens for a request to validate access code
// Return:
//      success (boolean) as Json
app.post(identifiers.POST_VALIDATE_ACCESS_CODE, async (req, res) => {

    const firebase = require('./Firebase');

    // Read the database, get the result of the function call as boolean
    const result = await firebase.readUserData(admin, req.body.phoneNumber, req.body.accessCode);
    let returnValue;
    if (result) {

        // If the access code is matched with the phone number, return success true
        returnValue = JSON.stringify({success: true});
    } else {

        // If the access code does not match or the phone number does not exist, return success false
        returnValue = JSON.stringify({success: false});
    }
    res.send(returnValue);
});

app.listen(port, () => {
    console.log('Sever is running on port ' + port);
});