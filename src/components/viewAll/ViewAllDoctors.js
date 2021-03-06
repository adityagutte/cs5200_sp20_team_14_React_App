import React from "react";
import {logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllDoctors extends React.Component {

    state = {
        doctors: [],
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
            </div>
        );
    }
}