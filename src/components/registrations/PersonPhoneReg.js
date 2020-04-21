import React from "react"
import {logout, profile, registerPersonPhone} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";
import AdminNavBar from "../../react/AdminNavBar";

export default class PersonPhoneReg extends React.Component {
    state = {
        profile: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            isPrimary: ''
        }
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    registerPersonPhone = (address) =>
        registerPersonPhone(address, this.state.username)
            .then(() => {
                alert("Phone added to profile successfully")
            });

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                phone: '',
                isPrimary: 'false'
            }))
    }

    validatePatientPhone = () => {
        if (this.state.phone === '') {
            alert("Phone cannot be empty :(")
            return false
        } else {
            this.registerPersonPhone(this.state, this.state.username)
        }
    };

    handleSelectPhoneChange = event => {
        this.setState({isPrimary: event.target.value});
        console.log(this.state)
    }

    renderNavBar() {
        if (this.state.profile.userType === "Patient") {
            return <PatientNavBar/>
        } else if (this.state.profile.userType === "Doctor") {
            return <DoctorNavBar/>
        } else if (this.state.profile.userType === "Admin Staff") {
            return <AdminNavBar/>
        }
    }

    render() {
        return (
            <div>
                {this.renderNavBar()}
                <hr/>
                <h1>Contact Information</h1>
                Hi {this.state.profile.username}!
                <hr/>
                <h3>Add address to your profile</h3>
                <br/>
                <div>
                    <input
                        value={this.state.phone}
                        onChange={(e) => this.setState({
                            phone: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Phone (###-##-####)"}/>
                    <br/>

                    <div>
                        <select
                            className={"form-control"}
                            value={this.state.isPrimary}
                            onChange={this.handleSelectPhoneChange}>
                            <option value={"false"}>No</option>
                            <option value={"true"}>Yes</option>
                        </select>
                    </div>
                    <br/>
                    <button
                        onClick={this.validatePatientPhone}
                        // onClick={() => this.registerPatientAddr(this.state)}
                        className="btn btn-primary btn-block">
                        SUBMIT
                    </button>
                </div>

                <br/>
                <button
                    onClickCapture={this.logout}
                    className={"btn btn-danger"}
                    onClick={this.logout}>
                    Logout
                </button>
            </div>
        )
    }
}