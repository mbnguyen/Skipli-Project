
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
    if (result != null) {
        const sms = require('./SendSms');
        let phoneNumber = '+1' + req.body.phoneNumber;
        sms.sendSms(accessCode.toString(), phoneNumber);
        const returnValue = JSON.stringify({accessCode: accessCode.toString()});
        res.send(returnValue);
    } else {
        const returnValue = JSON.stringify({accessCode: 0});
        res.send(returnValue);
    }
});

app.post('/validate-access-code', async (req, res) => {
    const firebase = require('./Firebase');
    const result = await firebase.readUserData(admin, req.body.phoneNumber, req.body.accessCode);
    let returnValue;
    if (result) {
        returnValue = JSON.stringify({success: true});
    } else {
        returnValue = JSON.stringify({success: false});
    }

    res.send(returnValue);
});

app.listen(port, () => {
    console.log('Sever is running on port ' + port);
});