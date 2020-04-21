import React from 'react';
import {login} from "../services/UserService";

class Login extends React.Component {

    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    state = {
        username: '',
        password: '',
        verifyPassword: ''
    };

    login = (user) =>
        login(user)
            .then(currentUser => {
                    if (this.isEmpty(currentUser)) {
                        alert("Invalid username or password :( Please try again")
                    } else {
                        if (currentUser.userType === "Patient") {
                            this.props.history.push("/patientProfile")
                        } else if (currentUser.userType === "Doctor") {
                            this.props.history.push("/doctorProfile")
                        } else if (currentUser.userType === "Admin Staff") {
                            this.props.history.push("/adminStaffProfile")
                        }
                    }
                }
            );

    render() {
        return (
            <div>
                <h1>LOGIN</h1>
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
                <button
                    onClick={() => this.login(this.state)}
                    className="btn btn-primary btn-block">
                    LOGIN
                </button>
            </div>
        );
    }
}

export default Login;