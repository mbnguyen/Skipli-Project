// --------------------------------------------------------------------------------
// File: Validate.js
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
    VALID_PHONE_NUMBER: 'validPhoneNumber',
    VALID_ACCESS_CODE: 'validAccessCode'
};

// This function validate a value using its set of rules
// Parameter:
//      value (String): the value to be checked
//      rules (Json): the set of rules to be applied
// Return:
//      true: the value is qualified
//      false: the value is not qualified
const validate = (value, rules) => {

    let isValid = true;
    for (let rule in rules) {

        switch (rule) {

            // Validate the phone number
            case identifiers.VALID_PHONE_NUMBER: isValid = isValid && phoneNumberValidator(value); break;
            // Validate the access code
            case identifiers.VALID_ACCESS_CODE: isValid = isValid && accessCodeValidator(value); break;
            default: isValid = true;
        }
    }
    return isValid;
}

// This function validate the phone number
// Parameter:
//      value (String): the phone number to be checked
// Return:
//      true: the value is qualified
//      false: the value is not qualified
const phoneNumberValidator = (value) => {

    // The phone number must be a string of 10-digits number
    var re = /^\d{10}$/;
    return re.test(String(value).toLowerCase());
}

// This function validate the access code
// Parameter:
//      value (String): the access code to be checked
// Return:
//      true: the value is qualified
//      false: the value is not qualified
const accessCodeValidator = (value) => {

    // The access code must be a string of 6-digits number
    var re = /^\d{6}$/;
    return re.test(String(value).toLowerCase());
}

export default validate;