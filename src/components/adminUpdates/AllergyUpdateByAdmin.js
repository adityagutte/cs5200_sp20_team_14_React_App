import React from "react";
import {profile, updatePatientAllergy} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class AllergyUpdateByAdmin extends React.Component {

    state = {
        allergy: [],
        profile: {
            username: '',
            userType: '',
            allergyId: '',
            allergyInfo: '',
            allergyCause: ''
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                allergyId: '',
                allergyInfo: '',
                allergyCause: ''
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


    updateAllergy = (allergy) =>
        updatePatientAllergy(allergy, this.state.allergyId)
            .then(() => {
                alert("Allergy has been updated :) Refresh page to see changes")
            })


    validateUpdateAllergy = () => {
        if (this.state.allergyId === '') {
            alert("Allergy ID cannot be empty :(")
            return false
        } else if (this.state.allergyInfo === '') {
            alert("Allergy Info cannot be empty :(")
            return false
        } else if (this.state.allergyCause === '') {
            alert("Allergy Cause cannot be empty :(")
            return false
        } else {
            this.updateAllergy(this.state)
        }
    };

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
                <div>
                    <input
                        value={this.state.allergyId}
                        onChange={(e) => this.setState({
                            allergyId: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={"form-control"}
                        placeholder={"ENTER ALLERGY ID TO UPDATE ALLERGY"}/>
                    <br/>
                    <input
                        value={this.state.allergyInfo}
                        onChange={(e) => this.setState({
                            allergyInfo: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Allergy Info"}/>
                    <br/>
                    <div>
                        <input
                            value={this.state.allergyCause}
                            onChange={(e) => this.setState({
                                allergyCause: e.target.value
                            })}
                            className={"form-control"}
                            placeholder={"Allergy Cause"}/>
                    </div>
                    <br/>
                    <button
                        // onClick={this.validatePatientProfile}
                        onClick={this.validateUpdateAllergy}
                        className="btn btn-primary btn-block">
                        UPDATE ALLERGY
                    </button>
                </div>
                <br/>
            </div>
        );
    }
}