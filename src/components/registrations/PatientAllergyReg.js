import React from "react"
import {logout, profile, registerPatientAllergy} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";

export default class PatientAllergyReg extends React.Component {
    state = {
        profile: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            allergyInfo: '',
            allergyCause: ''
        }
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    registerPatientAllergy = (allergy) =>
        registerPatientAllergy(allergy, this.state.username)
            .then(() => {
                alert("Allergy added to profile successfully")
            });

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                allergyInfo: '',
                allergyCause: ''
            }))
    }

    validateAllergy = () => {
        if (this.state.allergyInfo === '') {
            alert("Allergy information cannot be empty :(")
            return false
        } else if (this.state.allergyCause === '') {
            alert("Allergy cause cannot be empty :(")
            return false
        } else {
            this.registerPatientAllergy(this.state)
        }
    };

    render() {
        return (
            <div>
                <PatientNavBar/>
                <hr/>
                <h1>Contact Information</h1>
                Hi {this.state.profile.username}!
                <hr/>
                <h3>Add an allergy to your profile</h3>
                <br/>
                <div>
                    <input
                        value={this.state.allergyInfo}
                        onChange={(e) => this.setState({
                            allergyInfo: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Allergy Information"}/>
                    <br/>
                    <input
                        value={this.state.allergyCause}
                        onChange={(e) => this.setState({
                            allergyCause: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Allergy Cause"}/>
                    <br/>
                    <button
                        onClick={this.validateAllergy}
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
