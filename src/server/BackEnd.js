
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4041;

const firebase = require('./Firebase');
firebase.configFireBase();
const admin = require('firebase-admin');
admin.initializeApp();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.post('/create-new-access-code', async (req, res) => {
    const firebase = require('./Firebase');
    let accessCode = 0;
    for (i = 0; i < 6; i++) {
        accessCode = accessCode * 10 + Math.floor(Math.random() * Math.floor(9));
    }
    const result = await firebase.writeUserData(admin, req.body.phoneNumber, accessCode)
    const sms = require('./SendSms');
    let phoneNumber = '+1' + req.body.phoneNumber;
    sms.sendSms(accessCode.toString(), phoneNumber);
    const returnValue = JSON.stringify({accessCode: accessCode.toString()});
    res.send(returnValue);
});

app.post('/validate-access-code', (req, res) => {
    res.send('Running /validate-access-code');
});

app.post('/send', (req, res) => {
    const sms = require('./SendSms');
    console.log(req.body.phoneNumber);
    //res.send(sms.sendSms('123', '+16178492720'));
});

app.listen(port, () => {
    console.log('Sever is running on port ' + port);
});