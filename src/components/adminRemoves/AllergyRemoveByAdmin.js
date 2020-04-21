import React from "react";
import {logout, profile, deletePatientAllergy} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class AllergyRemoveByAdmin extends React.Component {

    state = {
        allergy: [],
        profile: {
            username: '',
            userType: '',
            allergyId: '',
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

    logout = () => logout()
        .then(status => this.props.history.push("/"))

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

    deleteAllergies = () =>
        deletePatientAllergy(this.state.allergyId)
            .then(() => {
                alert("Allergy has been removed! Refresh page to see changes :)")
            })

    validateDeleteAllergy = () => {
        if (this.state.allergyId === '') {
            alert("Allergy ID cannot be empty :(")
            return false
        } else {
            this.deleteAllergies()
        }
    };

    render() {
        return (
            <div>
                <AdminNavBar/>
                <hr/>
                <div>
                    <h2>ALLERGY INFORMATION</h2>
                    For user: <b>{this.state.profile.username} {this.state.profile.userType}</b>
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
                <div>
                    <input
                        value={this.state.allergyId}
                        onChange={(e) => this.setState({
                            allergyId: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={"form-control"}
                        placeholder={"ENTER ALLERGY ID TO REMOVE APPOINTMENT"}/>
                    <br/>

                    <button
                        // onClick={this.validatePatientProfile}
                        onClick={this.validateDeleteAllergy}
                        className="btn btn-primary btn-block">
                        DELETE ALLERGY
                    </button>
                </div>
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