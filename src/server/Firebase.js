
function configFireBase() {
    var firebase = require('firebase/app');
    require('firebase/auth');
    require('firebase/database');
    require('firebase/firestore');
    var firebaseConfig = {
        apiKey: "AIzaSyCHE7TmX38lijGoGfC1jQDrp_Qe51_qzwA",
        authDomain: "skipli-project-e4795.firebaseapp.com",
        databaseURL: "https://skipli-project-e4795.firebaseio.com",
        projectId: "skipli-project-e4795",
        storageBucket: "skipli-project-e4795.appspot.com",
        messagingSenderId: "421719904043",
        appId: "1:421719904043:web:c57b93bcc103d75b8aff6e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}
exports.configFireBase = configFireBase;


async function writeUserData(admin, phoneNumber, accessCode) {
    const db = admin.firestore();
    const docRef = db.collection('users').doc(phoneNumber);
    let returnValue = false;
    await docRef.set({
        accessCode: accessCode
    }).then(function() {
        returnValue = true;
    });
    return returnValue;
}
exports.writeUserData = writeUserData;

async function readUserData(admin, phoneNumber, accessCode) {
    const db = admin.firestore();
    const docRef = db.collection('users').doc(phoneNumber);
    const doc = await docRef.get();
    if (!doc.exists) {
        return false;
    } else {
        if (doc.data()['accessCode'] == accessCode) {
            return true;
        } else {
            return false;
        }
    }
}
exports.readUserData = readUserData;
