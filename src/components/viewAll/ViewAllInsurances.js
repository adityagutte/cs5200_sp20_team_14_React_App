import React from "react";
import {logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllInsurances extends React.Component {

    state = {
        insurance: [],
        profile: {
            username: '',
            userType: '',
            insuranceId: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                insuranceId: ''
            }))
            .then(this.findAllInsurances)
    }


    findAllInsurances = () =>
        fetch("api/insurances/find/all")
            .then(response => response.json())
            .then(allInsurances => this.setState({
                insurance: allInsurances
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));


    renderTableData() {
        return this.state.insurance.map((insurance, index) => {
            const {id, insuranceDetails, insuranceType} = insurance //destructuring
            const patientName = insurance.patient.firstName + " " + insurance.patient.lastName
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{insuranceDetails}</td>
                    <td>{insuranceType}</td>
                    <td>{patientName}</td>
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
                    <h2>INSURANCE INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Insurance Details</th>
                        <th>Insurance Type</th>
                        <th>Patient Name</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <hr/>
            </div>
        );
    }
}