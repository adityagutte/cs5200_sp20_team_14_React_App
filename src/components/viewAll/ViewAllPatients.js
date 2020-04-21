import React from "react";
import {logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllPatients extends React.Component {

    state = {
        patients: [],
        profile: {
            username: '',
            userType: '',
            addressId: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                addressId: ''
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
            </div>
        );
    }
}