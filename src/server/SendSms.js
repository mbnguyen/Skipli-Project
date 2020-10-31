// --------------------------------------------------------------------------------
// File: SendSms.js
// Project: Skipli Project
// Description: This programs simulate the verifying phone number process.
//              Using React Node.js for front end.
//              Using Express for back end.
//              Using Firebase Firestore for database.
//              Using Twilio for texting.
// Programmer: Minh Nguyen
// Last modified: 10/30/2020
// --------------------------------------------------------------------------------

// This function send an access code to the phone number using Twilio
// Parameter:
//      accessCode (String): the access code to be sent
//      phoneNumber (String): the phone number to be sent to
// Return:
//      true: sent successfully
//      false: failed to send
function sendSms (accessCode, phoneNumber) {

    // Config Twilio
    const Twilio = require('twilio');
    const twilioConfig = require('./twilio');
    const client = new Twilio(twilioConfig.accountSid, twilioConfig.authToken);
    const text = "Your access code is: " + accessCode;

    // Send the text
    client.messages
        .create({
            body: text,
            from: twilioConfig.sendFrom,
            to: phoneNumber
        }, function(err, result) {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
}

exports.sendSms = sendSms;

