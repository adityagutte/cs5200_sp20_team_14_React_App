import React from "react";
import {logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllAllergies extends React.Component {

    state = {
        allergy: [],
        profile: {
            username: '',
            userType: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                allergyId: ''
            }))
            .then(this.findAllAllergies)
    }


    findAllAllergies = () =>
        fetch("api/allergies/find/all")
            .then(response => response.json())
            .then(allAllergies => this.setState({
                allergy: allAllergies
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    renderTableData() {
        return this.state.allergy.map((allergy, index) => {
            const {id, allergyInfo, allergyCause} = allergy //destructuring
            const patientName = allergy.patient.firstName + " " + allergy.patient.lastName
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{allergyInfo}</td>
                    <td>{allergyCause}</td>
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
                    <h2>ALLERGY INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Allergy Info</th>
                        <th>Allergy Cause</th>
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