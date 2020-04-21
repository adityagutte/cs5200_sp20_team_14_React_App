import React from "react";
import {profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllPrescriptions extends React.Component {

    state = {
        salaries: [],
        profile: {
            username: '',
            userType: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile
            }))
            .then(this.findAllSalaries)
    }


    findAllSalaries = () =>
        fetch("api/salary/find/all")
            .then(response => response.json())
            .then(allSalaries => this.setState({
                salaries: allSalaries
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    renderTableData() {
        return this.state.salaries.map((salary, index) => {
            const {id, baseSalary, allowances, epf} = salary //destructuring
            const staffId = salary.staff.id
            const staffName = salary.staff.firstName + " " + salary.staff.lastName
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{baseSalary}</td>
                    <td>{allowances}</td>
                    <td>{epf}</td>
                    <td>{staffId}</td>
                    <td>{staffName}</td>
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
                    <h2>PRESCRIPTION INFORMATION</h2>
                    For user: <b>{this.state.profile.username} </b>
                    User type: <b>{this.state.profile.userType}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Salary Basic</th>
                        <th>Allowances</th>
                        <th>EPF</th>
                        <th>Staff ID</th>
                        <th>Staff Name</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <hr/>
            </div>
        );
    }
}