// --------------------------------------------------------------------------------
// File: Firebase.js
// Project: Skipli Project
// Description: This programs simulate the verifying phone number process.
//              Using React Node.js for front end.
//              Using Express for back end.
//              Using Firebase Firestore for database.
//              Using Twilio for texting.
// Programmer: Minh Nguyen
// Last modified: 10/30/2020
// --------------------------------------------------------------------------------

// Identifiers
const identifiers = {
    USERS: 'users',
    ACCESS_CODE: 'accessCode'
}

// This function write a new phone number and its access code to the database
// Parameter:
//      admin: ref to FireStore
//      phoneNumber (String): the phone number to be written
//      accessCode (Integer): the access code to be written
// Return:
//      true: successfully wrote to database
//      false: failed to write to database
async function writeUserData(admin, phoneNumber, accessCode) {

    // Create and get reference to the document with the key is the phone number
    const db = admin.firestore();
    const docRef = db.collection(identifiers.USERS).doc(phoneNumber);

    // Write access code to the document
    let returnValue = false;
    await docRef.set({
        accessCode: accessCode
    }).then(function() {
        returnValue = true;
    });
    return returnValue;
}
exports.writeUserData = writeUserData;

// This function read the database to see if the access code is matched with the phone number. If matched, delete the access code
// Parameter:
//      admin: ref to FireStore
//      phoneNumber (String): the phone number to be checked
//      accessCode (Integer): the access code to be checked
// Return:
//      true: successfully matched
//      false: the access code does not match
async function readUserData(admin, phoneNumber, accessCode) {

    // Get reference to the document with the key is the phone number
    const db = admin.firestore();
    const docRef = db.collection(identifiers.USERS).doc(phoneNumber);
    const doc = await docRef.get();

    if (!doc.exists) {

        // If we don't have the phone number on the database, return false
        return false;
    } else {

        // We have the phone number on the database
        if (doc.data()[identifiers.ACCESS_CODE] == accessCode) {

            //The access code matches with what we have on the database
            // Delete the access code
            const res = await docRef.update({
                accessCode: null
            });
            return true;
        } else {

            //The access code does not match with what we have on the database
            return false;
        }
    }
}
exports.readUserData = readUserData;
