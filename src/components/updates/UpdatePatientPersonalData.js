import React from "react"
import {logout, profile, updatePatientInfo} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";


export default class UpdatePatientPersonalData extends React.Component {

    state = {
        profile: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            dateOfAdmission: '',
            medicalHistory: '',
            gender: 'Male',
        },
    }

    isValidDate = (dateString) => {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    validatePatientProfile = () => {
        if (this.state.firstName === '') {
            alert("First Name cannot be empty :(")
            return false
        } else if (this.state.lastName === '') {
            alert("Last Name cannot be empty :(")
            return false
        } else if (this.state.dateOfBirth === '') {
            alert("Date of Birth cannot be empty :(")
            return false
        } else if (!this.isValidDate(this.state.dateOfBirth)) {
            alert("Date of Birth format is invalid :(")
            return false
        } else if (this.state.dateOfAdmission === '') {
            alert("Verify password cannot be empty :(")
            return false
        } else if (!this.isValidDate(this.state.dateOfAdmission)) {
            alert("Date of Admission format is invalid :(")
            return false
        } else {
            this.updatePatientInfo(this.state)
        }

    };

    logout = () => logout()
        .then(status => this.props.history.push("/"))


    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                dateOfAdmission: '',
                medicalHistory: '',
                gender: 'Male'
            }))
    }

    handleSelectChange = event => {
        this.setState({gender: event.target.value});
        console.log(this.state)
    }

    updatePatientInfo = (patient) =>
        updatePatientInfo(patient, this.state.username)
            .then((response) => {
                if (response.status === 500) {
                    console.log(response)
                    alert("Problem updating profile :o  ")

                } else {
                    console.log(response)
                    alert("Profile updated successfully :)")
                }
            });


    render() {
        return (
            <div>
                <PatientNavBar/>
                <hr/>
                Hi {this.state.profile.username}!
                <br/>
                <b>User Type:</b> Patient
                <br/>
                <hr/>
                <h3>UPDATE YOUR PROFILE</h3>
                <br/>
                <div>
                    <input
                        value={this.state.firstName}
                        onChange={(e) => this.setState({
                            firstName: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"First Name"}/>
                    <br/>
                    <input
                        value={this.state.lastName}
                        onChange={(e) => this.setState({
                            lastName: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Last Name"}/>
                    <br/>

                    <input
                        value={this.state.dateOfBirth}
                        onChange={(e) => this.setState({
                            dateOfBirth: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Date Of Birth  (YYYY-MM-DD)"}/>
                    <br/>

                    <input
                        value={this.state.dateOfAdmission}
                        onChange={(e) => this.setState({
                            dateOfAdmission: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Date of Admission (YYYY-MM-DD)"}/>
                    <br/>

                    <input
                        value={this.state.medicalHistory}
                        onChange={(e) => this.setState({
                            medicalHistory: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Medical History (if any)"}/>
                    <br/>
                    <div>
                        <select
                            className={"form-control"}
                            value={this.state.gender}
                            onChange={this.handleSelectChange}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <br/>
                    <button
                        onClick={this.validatePatientProfile}
                        // onClick={() => this.registerPatientInfo(this.state)}
                        className="btn btn-primary btn-block">
                        UPDATE
                    </button>
                </div>
                <hr/>
            </div>
        )
    }
}