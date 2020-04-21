import React from "react";
import {deleteDoctor, logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class DoctorRemoveByAdmin extends React.Component {

    state = {
        doctors: [],
        profile: {
            username: '',
            userType: '',
            doctorId: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                                               profile: profile,
                                               doctorId: ''
                                           }))
            .then(this.findAllDoctors)
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllDoctors = () =>
        fetch("api/doctors/find/all/")
            .then(response => response.json())
            .then(allDoctors => this.setState({
                                                  doctors: allDoctors
                                              }))
            .catch(() => alert("Can’t access response. Blocked by browser?"));

    renderTableData() {
        return this.state.doctors.map((doctor, index) => {
            const {
                id, firstName, lastName, username, password, dateOfBirth,
                status, department, joiningDate, salary, designation, education,
                certification, gender
            } = doctor //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{username}</td>
                    <td>{password}</td>
                    <td>{dateOfBirth}</td>
                    <td>{status}</td>
                    <td>{department}</td>
                    <td>{joiningDate}</td>
                    <td>{designation}</td>
                    <td>{education}</td>
                </tr>
            )
        })
    }

    deleteDoctor = () =>
        deleteDoctor(this.state.doctorId)
            .then(() => {
                alert("Doctor has been removed! Refresh page to see changes :)")
            })

    validateDeleteDoctor = () => {
        if (this.state.doctorId === '') {
            alert("Doctor ID cannot be empty :(")
            return false
        } else {
            this.deleteDoctor()
        }
    };

    render() {
        return (
            <div>
                <AdminNavBar/>
                <hr/>
                <div>
                    <h2>ALL DOCTOR INFORMATION</h2>
                    For user: <b>{this.state.profile.username} {this.state.profile.userType}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>DOB</th>
                        <th>Status</th>
                        <th>Department</th>
                        <th>Joining Date</th>
                        <th>Designation</th>
                        <th>Education</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <hr/>
                <br/>
                <input
                    value={this.state.doctorId}
                    onChange={(e) => this.setState({
                                                       doctorId: e.target.value
                                                   })}

                    className={"form-control"}
                    placeholder={"ENTER DOCTOR USERNAME TO REMOVE DOCTOR"}/>
                <br/>

                <button
                    // onClick={this.validatePatientProfile}
                    onClick={this.validateDeleteDoctor}
                    className="btn btn-primary btn-block">
                    DELETE DOCTOR
                </button>
                <br/>
                <button
                    onClickCapture={this.logout}
                    className={"btn btn-danger"}
                    onClick={this.logout}>
                    Logout
                </button>
            </div>
        );
    }
}