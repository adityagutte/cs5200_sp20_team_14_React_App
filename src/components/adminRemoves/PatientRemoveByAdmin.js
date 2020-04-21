import React from "react";
import {deletePatient, logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class PatientRemoveByAdmin extends React.Component {

    state = {
        patients: [],
        profile: {
            username: '',
            userType: '',
            patientId: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                                               profile: profile,
                                               patientId: ''
                                           }))
            .then(this.findAllPatients)
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllPatients = () =>
        fetch("api/patients/find/all/")
            .then(response => response.json())
            .then(allPatients => this.setState({
                                                   patients: allPatients
                                               }))
            .catch(() => alert("Can’t access response. Blocked by browser?"));

    renderTableData() {
        return this.state.patients.map((doctor, index) => {
            const {
                id, firstName, lastName, username, password, dateOfBirth,
                dateOfAdmission, medicalHistory, gender
            } = doctor //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{username}</td>
                    <td>{password}</td>
                    <td>{dateOfBirth}</td>
                    <td>{dateOfAdmission}</td>
                    <td>{medicalHistory}</td>
                    <td>{gender}</td>
                </tr>
            )
        })
    }

    deletePatient = () =>
        deletePatient(this.state.patientId)
            .then(() => {
                alert("Patient has been removed! Refresh page to see changes :)")
            })

    validateDeletePatient = () => {
        if (this.state.patientId === '') {
            alert("Patient ID cannot be empty :(")
            return false
        } else {
            this.deletePatient()
        }
    };

    render() {
        return (
            <div>
                <AdminNavBar/>
                <hr/>
                <div>
                    <h2>ALL PATIENT INFORMATION</h2>
                    User: <b>{this.state.profile.username}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>DOB</th>
                        <th>DOA</th>
                        <th>Med History</th>
                        <th>Gender</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <hr/>
                <br/>
                <input
                    value={this.state.patientId}
                    onChange={(e) => this.setState({
                                                       patientId: e.target.value
                                                   })}

                    className={"form-control"}
                    placeholder={"ENTER PATIENT USERNAME TO REMOVE PATIENT"}/>
                <br/>

                <button
                    // onClick={this.validatePatientProfile}
                    onClick={this.validateDeletePatient}
                    className="btn btn-primary btn-block">
                    DELETE PATIENT
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