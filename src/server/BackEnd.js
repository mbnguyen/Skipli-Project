
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4041;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.post('/create-new-access-code', (req, res) => {
   res.send('Running /create-new-access-code');
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