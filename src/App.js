import './App.css';
import validate from './Validate';
import React, {Component} from 'react';

const message = {
    NEED_PHONE: 'need-phone'
}

class App extends Component {

    constructor() {
        super();

        this.state = {
            formControls : {
                phoneNumber: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        validPhoneNumber: true
                    }
                },
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

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls
        });
    }

    formSubmitHandler = (e) =>  {
        e.preventDefault();
        if (!this.state.formControls.phoneNumber.valid) {
            alert("Please enter a phone number");
            this.setState({result: message.NEED_PHONE});
        } else if (!this.state.formControls.accessCode.valid) {
            fetch('http://localhost:4041/create-new-access-code' , {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: this.state.formControls.phoneNumber.value
                })
            }).then(response => response.json())
                .then(data => {
                    if (data['accessCode'] != 0) {
                        alert("The access code was sent to your phone!");
                    } else {
                        alert("Cannot send the access code, please try again");
                    }
                });
        } else {
            fetch('http://localhost:4041/validate-access-code' , {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: this.state.formControls.phoneNumber.value,
                    accessCode: this.state.formControls.accessCode.value
                })
            }).then(response => response.json())
                .then(data => {
                    if (data['success'] == true) {
                        alert("Your phone number was successfully verified!");
                    } else {
                        alert("The access code you entered doesn't match our record!");
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
