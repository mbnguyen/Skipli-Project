

const Twilio = require('twilio');


function sendSms (accessCode, phoneNumber) {

    const twilioConfig = require('./twilio');
    const client = new Twilio(twilioConfig.accountSid, twilioConfig.authToken);
    const text = "Your access code is: " + accessCode;

    client.messages
        .create({
            body: text,
            from: twilioConfig.sendFrom,
            to: phoneNumber
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Created message using callback');
            }
        });
}

exports.sendSms = sendSms;

