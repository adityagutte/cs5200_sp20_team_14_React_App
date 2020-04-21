import React from "react"
import {logout, profile} from "../services/UserService";
import DoctorNavBar from "../react/DoctorNavBar";

export default class DoctorProfile extends React.Component {

    state = {
        profile: {
            username: '',
            userType: ''
        },
        loadedProfile: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            joiningDate: '',
            education: '',
            designation: '',
            certification: '',
            status: '',
            department: '',
            gender: '',
        }
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile
            })).then(profile => fetch("api/doctors/find/username/" + this.state.profile.username))
            .then(response => response.json())
            .then(profile => this.setState({
                loadedProfile: profile
            }))
    }

    render() {
        return (
            <div>
                <DoctorNavBar/>
                <hr/>
                <h1>DOCTOR PROFILE</h1>
                Hi {this.state.profile.username}!
                <br/>
                User Type: DOCTOR
                <hr/>
                <h2>PERSONAL PROFILE</h2>
                <br/>
                <li><b>First Name:</b> {this.state.loadedProfile.firstName}</li>
                <li><b>Last Name:</b> {this.state.loadedProfile.lastName}</li>
                <li><b>Birth Date:</b> {this.state.loadedProfile.dateOfBirth}</li>
                <li><b>Joining Date:</b> {this.state.loadedProfile.joiningDate}</li>
                <li><b>Medical History:</b> {this.state.loadedProfile.education}</li>
                <li><b>Designation:</b> {this.state.loadedProfile.designation}</li>
                <li><b>Certification:</b> {this.state.loadedProfile.certification}</li>
                <li><b>Status:</b> {this.state.loadedProfile.status}</li>
                <li><b>Department:</b> {this.state.loadedProfile.department}</li>
                <li><b>Gender:</b> {this.state.loadedProfile.gender}</li>
                <hr/>
            </div>
        )
    }
}
