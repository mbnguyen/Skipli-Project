const validate = (value, rules) => {
    let isValid = true;

    for (let rule in rules) {

        switch (rule) {
            case 'validPhoneNumber': isValid = isValid && phoneNumberValidator(value); break;
            case 'validAccessCode': isValid = isValid && accessCodeValidator(value); break;
            default: isValid = true;
        }

    }

    return isValid;
}


/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const phoneNumberValidator = (value, formValid) => {
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(String(value).toLowerCase());
}

const accessCodeValidator = (value, formValid) => {
    var re = /^\d{6}$/;
    return re.test(String(value).toLowerCase());
}




export default validate;