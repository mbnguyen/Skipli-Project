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
            result: "",
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
        }
        fetch('http://localhost:4041/create-new-access-code' , {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
                phoneNumber: this.state.formControls.phoneNumber.value
            })
        }).then(res=>res.json())
            .then(res => console.log(res));
    }

    formatResult() {
        let value = "";
        switch (this.state.result) {
            case message.NEED_PHONE: value = "Please enter the phone number"; break;
        }
        return value;
    }

    render() {
        return (
            <div className="form">

                <form onSubmit={this.formSubmitHandler} onChange={this.changeHandler}>
                    <div>
                        <span>Phone Number: </span>
                        <input type="phoneNumber" name="phoneNumber" value={this.state.formControls.phoneNumber.value}/>
                        <button onSubmit={this.formSubmitHandler} disabled={!this.state.formControls.phoneNumber.valid}>Submit</button>
                        <span hidden={this.state.formControls.phoneNumber.valid}>The phone number needs to have 10 digits. Ex: 123-456-7890</span>
                    </div>
                    <div>
                        <span>Access Code: </span>
                        <input type="accessCode" name="accessCode" value={this.state.formControls.accessCode.value}/>
                        <button onSubmit={this.formSubmitHandler} disabled={!this.state.formControls.accessCode.valid}>Verify Access Code</button>
                        <span hidden={this.state.formControls.accessCode.valid}>The access code needs to have 6 digits. Ex: 123456</span>
                    </div>
                </form>

                <h4>{this.formatResult()}</h4>

            </div>
        );
    }
}

export default App;
