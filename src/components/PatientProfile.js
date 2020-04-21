import React from "react"
import {logout, profile} from "../services/UserService";
import PatientNavBar from "../react/PatientNavBar";

export default class PatientProfile extends React.Component {

    state = {
        profile: {
            username: '',
            userType: ''
        },

        loadedProfile: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            dateOfAdmission: '',
            medicalHistory: '',
            gender: ''
        }
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile
            }))
            .then(profile => fetch("api/patients/find/username/" + this.state.profile.username))
            .then(response => response.json())
            .then(profile => this.setState({
                loadedProfile: profile
            }))
    }

    render() {
        return (
            <div>
                <PatientNavBar/>
                <hr/>
                <h1>PATIENT PROFILE</h1>
                Hi {this.state.profile.username}!
                <br/>
                <b>User Type:</b> Patient
                <br/>
                <hr/>
                <h2>PERSONAL DETAILS</h2>
                <br/>

                <li><b>First Name:</b>  {this.state.loadedProfile.firstName}</li>
                <li><b>Last Name:</b> {this.state.loadedProfile.lastName}</li>
                <li><b>Birth Date:</b> {this.state.loadedProfile.dateOfBirth}</li>
                <li><b>Admission Date:</b> {this.state.loadedProfile.dateOfAdmission}</li>
                <li><b>Medical History:</b> {this.state.loadedProfile.medicalHistory}</li>
                <li><b>Gender:</b> {this.state.loadedProfile.gender}</li>

                <hr/>
            </div>
        )
    }
}
