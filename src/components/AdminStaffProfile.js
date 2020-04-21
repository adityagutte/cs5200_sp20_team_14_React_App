import React from "react"
import {profile,logout} from "../services/UserService";
import AdminNavBar from "../react/AdminNavBar";

export default class AdminStaffProfile extends React.Component {

    state = {
        profile: {
            username: '',
            userType: ''
        },

        loadedProfile: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            status: '',
            joiningDate: '',
            jobTitle: '',
            jobDescription: '',
            gender: '',
            department: ''
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile
            })).then(profile => fetch("api/adminstaff/find/username/" + this.state.profile.username))
            .then(response => response.json())
            .then(profile => this.setState({
                loadedProfile: profile
            }))
    }


    render() {
        return(
            <div>
                <AdminNavBar/>
                <hr/>
                <h1>Administration Staff Profile</h1>
                Hi {this.state.profile.username}!
                <br/>
                User Type: {this.state.profile.userType}
                <hr/>
                <h2>PERSONAL PROFILE</h2>
                <br/>
                <li><b>First Name:</b> {this.state.loadedProfile.firstName}</li>
                <li><b>Last Name:</b> {this.state.loadedProfile.lastName}</li>
                <li><b>Birth Date:</b> {this.state.loadedProfile.dateOfBirth}</li>
                <li><b>Joining Date:</b> {this.state.loadedProfile.joiningDate}</li>
                <li><b>Medical History:</b> {this.state.loadedProfile.jobTitle}</li>
                <li><b>Designation:</b> {this.state.loadedProfile.jobDescription}</li>
                <li><b>Certification:</b> {this.state.loadedProfile.department}</li>
                <li><b>Status:</b> {this.state.loadedProfile.gender}</li>
                <hr/>
            </div>
        )
    }
}