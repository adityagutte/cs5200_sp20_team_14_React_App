import React from "react";
import {logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllAdminStaff extends React.Component {

    state = {
        adminStaff: [],
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
            .then(this.findAllAdminStaff)
    }


    findAllAdminStaff = () =>
        fetch("api/adminstaff/find/all/")
            .then(response => response.json())
            .then(adminStaff => this.setState({
                adminStaff: adminStaff
            }))
            .catch(() => alert("Can’t access response. Blocked by browser?"));


    renderTableData() {
        return this.state.adminStaff.map((admin, index) => {
            const {
                id, firstName, lastName, username, password, dateOfBirth,
                status, department, joiningDate, jobTitle, gender
            } = admin //destructuring
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
                    <td>{jobTitle}</td>
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
                    <h2>ALL ADMIN STAFF INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
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
                        <th>Job Title</th>
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