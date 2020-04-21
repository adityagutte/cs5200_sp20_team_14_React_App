import React from "react"
import {logout, profile, registerPatientInsurance} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";

export default class PatientAllergyReg extends React.Component {
    state = {
        profile: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            insuranceDetails: '',
            insuranceType: ''
        }
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    registerPatientInsurance = (insurance) =>
        registerPatientInsurance(insurance, this.state.username)
            .then(() => {
                alert("Insurance details added to profile successfully")
            });

    validateInsurance = () => {
        if (this.state.insuranceDetails === '') {
            alert("Insurance details cannot be empty :(")
            return false
        } else if (this.state.insuranceType === '') {
            alert("Insurance type  cannot be empty :(")
            return false
        } else {
            this.registerPatientInsurance(this.state)
        }
    };


    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                insuranceDetails: '',
                insuranceType: ''
            }))
    }


    render() {
        return (
            <div>
                <PatientNavBar/>
                <hr/>
                <h1>Contact Information</h1>
                Hi {this.state.profile.username}!
                <hr/>
                <h3>Add an insurance to your profile</h3>
                <br/>
                <div>
                    <input
                        value={this.state.insuranceDetails}
                        onChange={(e) => this.setState({
                            insuranceDetails: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Insurance Details"}/>
                    <br/>
                    <input
                        value={this.state.insuranceType}
                        onChange={(e) => this.setState({
                            insuranceType: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Insurance Type"}/>
                    <br/>
                    <button
                        onClick={this.validateInsurance}
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
