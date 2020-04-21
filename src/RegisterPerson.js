import React from "react";

import {register} from "./services/UserService";

export default class RegisterPerson extends React.Component {
    state = {
        username: '',
        password: '',
        verifyPassword: '',
        userKey: '',
        userType: 'Patient'
    }

    validate = () => {
        if (this.state.password !== this.state.verifyPassword) {
            alert("Password doesn't match :(")
            return false
        }
        if (this.state.username === "") {
            alert("Username cannot be empty :(")
            return false
        }
        if (this.state.password === "") {
            alert("Password cannot be empty :(")
            return false
        }
        if (this.state.verifyPassword === "") {
            alert("Verify password cannot be empty :(")
            return false
        }
        if (this.state.userKey === "") {
            alert("User Key password cannot be empty :(")
            return false
        } else {
            this.register(this.state)
        }
        ;
    }


    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    register = (user) =>
        register(user)
            .then(newUser => {
                if (this.isEmpty(newUser)) {
                    alert("Username is already taken or Key is wrong :(" +
                        "Please try with another username or user key")
                } else {
                    if (newUser.userType === "Patient") {
                        this.props.history.push("/patientProfileReg")
                    }
                    else if (newUser.userType === "Doctor") {
                        this.props.history.push("/doctorProfileReg")
                    }
                    else if (newUser.userType === "Admin Staff") {
                        this.props.history.push("/adminStaffProfileReg")
                    }
                }
            })

    handleSelect = event => {
        this.setState({userType: event.target.value});
        console.log(this.state)
    }


    render() {

        return (
            <div>
                <h1>REGISTER</h1>
                <input
                    value={this.state.username}
                    onChange={(e) => this.setState({
                        username: e.target.value
                    })}
                    className={"form-control"}
                    placeholder={"username"}/>
                <br/>
                <input
                    value={this.state.password}
                    onChange={(e) => this.setState({
                        password: e.target.value
                    })}
                    className={`form-control`}
                    type={"password"}
                    placeholder={"password"}/>
                <br/>

                <input
                    value={this.state.verifyPassword}
                    onChange={(e) => this.setState({
                        verifyPassword: e.target.value
                    })}
                    className={`form-control`}
                    type={"password"}
                    placeholder={"verify password"}/>
                <br/>

                <input
                    value={this.state.userKey}
                    onChange={(e) => this.setState({
                        userKey: e.target.value
                    })}
                    className={`form-control`}
                    type={"userKey"}
                    placeholder={"One Time User Password (OTP)"}/>
                <br/>
                <div>
                    <select
                        className={"form-control"}
                        value={this.state.userType}
                        onChange={this.handleSelect}>
                        <option>Patient</option>
                        <option>Doctor</option>
                        <option>Admin Staff</option>
                    </select>
                </div>
                <br/>
                <button
                    // onClick={() => this.register(this.state)}
                    onClick={this.validate}
                    className="btn btn-primary btn-block">
                    REGISTER
                </button>
            </div>
        )
    }
}