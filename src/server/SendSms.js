
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure

const Twilio = require('twilio');


function sendSms (accessCode, phoneNumber) {

    const accountSid = 'AC08e191a55d5f9c810156941729291199';
    const authToken = '6e7a64155ac9aec568d3931432f5cc6e';
    const client = new Twilio(accountSid, authToken);

    client.messages
        .create({
            body: accessCode,
            from: '+12029029353',
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

