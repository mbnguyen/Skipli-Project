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


const phoneNumberValidator = (value) => {
    var re = /^\d{10}$/;
    return re.test(String(value).toLowerCase());
}

const accessCodeValidator = (value) => {
    var re = /^\d{6}$/;
    return re.test(String(value).toLowerCase());
}




export default validate;