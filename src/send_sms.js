
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC08e191a55d5f9c810156941729291199';
const authToken = 'ede16904aebec251c10a9f9cfeac4ec6';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+12029029353',
        to: '+16178492720'
    })
    .then(message => console.log(message.sid));
