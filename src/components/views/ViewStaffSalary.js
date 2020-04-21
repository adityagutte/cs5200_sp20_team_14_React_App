import React from "react";
import {profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";

export default class ViewStaffSalary extends React.Component {
    state = {
        profile: {
            username: '',
            userType: '',
        },

        loadedProfile: {
            baseSalary: '',
            allowances: '',
            epf: ''
        }
    }


    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile
            }))
            .then(this.findSalaryByStaff)
    }

    findSalaryByStaff = () =>
        fetch("api/salary/find/staff/" + this.state.profile.username)
            .then(response => response.json())
            .then(salary => this.setState({
                loadedProfile: salary
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    renderNavBar() {
        if (this.state.profile.userType === "Doctor") {
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
                <div>
                    <h2>SALARY INFORMATION</h2>
                    For user: <b>{this.state.profile.username} {this.state.profile.userType}</b>
                    <hr/>
                    <li><b>Base Salary:</b> {this.state.loadedProfile.baseSalary}</li>
                    <li><b>Last Name:</b> {this.state.loadedProfile.allowances}</li>
                    <li><b>Birth Date:</b> {this.state.loadedProfile.epf}</li>
                </div>
                <hr/>
            </div>
        );
    }
}

