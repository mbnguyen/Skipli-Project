// --------------------------------------------------------------------------------
// File: App.js
// Project: Skipli Project
// Description: This programs simulate the verifying phone number process.
//              Using React Node.js for front end.
//              Using Express for back end.
//              Using Firebase Firestore for database.
//              Using Twilio for texting.
// Programmer: Minh Nguyen
// Last modified: 10/30/2020
// --------------------------------------------------------------------------------

import './App.css';
import validate from './Validate';
import React, {Component} from 'react';

// Messages to be displayed
const messages = {
    NEED_PHONE: "Please enter a phone number",
    CODE_SENT: "The access code was sent to your phone!",
    CODE_SEND_FAILED: "Cannot send the access code, please try again",
    VERIFIED: "Your phone number was successfully verified!",
    VERIFY_FAILED: "The access code you entered doesn't match our record!"
};

// Identifiers
const identifiers = {
    ACCESS_CODE: 'accessCode',
    CREATE_NEW_ACCESS_CODE: 'http://localhost:4041/create-new-access-code',
    VALIDATE_ACCESS_CODE: 'http://localhost:4041/validate-access-code',
    SUCCESS: 'success'
};

class App extends Component {

    constructor() {
        super();

        this.state = {
            formControls : {
                // Phone number
                phoneNumber: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        validPhoneNumber: true
                    }
                },
                // Access code
                accessCode: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        validAccessCode: true
                    }
                }
            }
        }
    }

    // Update and validate the form
    changeHandler = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };

        // Update and validate form
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls[name] = updatedFormElement;

        // Update state to be rendered
        this.setState({
            formControls: updatedControls
        });
    }

    // Submit the form
    formSubmitHandler = (e) =>  {

        // Prevent the browser to reload
        e.preventDefault();
        if (!this.state.formControls.phoneNumber.valid) {

            // If the phone number is not valid, ask the user to enter
            alert(messages.NEED_PHONE);
        } else if (!this.state.formControls.accessCode.valid) {

            // If we get only a valid phone number, we create a new access code
            // Send a request with the phone number to the back end
            fetch(identifiers.CREATE_NEW_ACCESS_CODE , {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: this.state.formControls.phoneNumber.value
                })
            }).then(response => response.json())
                .then(data => {
                    if (data[identifiers.ACCESS_CODE] != 0) {

                        // If we get a valid access code returned (meaning we sent successfully)
                        alert(messages.CODE_SENT);
                    } else {

                        // If we get a 0 as an access code returned (meaning we failed to create or send the access code
                        alert(messages.CODE_SEND_FAILED);
                    }
                });
        } else {

            // If we get both the phone number and the access code, we validate the access code and the phone number
            // Send a request with a phone number and an access code to the back end
            fetch(identifiers.VALIDATE_ACCESS_CODE, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: this.state.formControls.phoneNumber.value,
                    accessCode: this.state.formControls.accessCode.value
                })
            }).then(response => response.json())
                .then(data => {
                    if (data[identifiers.SUCCESS] == true) {

                        // Successfully verified
                        alert(messages.VERIFIED);
                    } else {

                        // Failed to verify
                        alert(messages.VERIFY_FAILED);
                    }
                });
        }
    }

    render() {
        return (
            <div className="form">

                <form onSubmit={this.formSubmitHandler} onChange={this.changeHandler}>

                    <div>
                        <span>Phone Number: </span>
                        <input type="phoneNumber" name="phoneNumber" value={this.state.formControls.phoneNumber.value}/>
                        <button onSubmit={this.formSubmitHandler} disabled={!this.state.formControls.phoneNumber.valid || (this.state.formControls.phoneNumber.valid && this.state.formControls.accessCode.valid)}>Submit</button>
                        <span hidden={this.state.formControls.phoneNumber.valid}>The phone number needs to have 10 digits. Ex: 1234567890</span>
                    </div>

                    <div>
                        <span>Access Code: </span>
                        <input type="accessCode" name="accessCode" value={this.state.formControls.accessCode.value}/>
                        <button onSubmit={this.formSubmitHandler} disabled={!this.state.formControls.accessCode.valid}>Verify Access Code</button>
                        <span hidden={this.state.formControls.accessCode.valid}>The access code needs to have 6 digits. Ex: 123456</span>
                    </div>

                </form>

            </div>
        );
    }
}

export default App;
