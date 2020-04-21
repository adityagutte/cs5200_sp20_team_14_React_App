import React from "react";
import {updatePatientAllergy, logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";

export default class UpdatePatientAllergy extends React.Component {

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

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllAllergies = () =>
        fetch("api/allergies/find/patient/" + this.state.profile.username)
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
        }else if (this.state.allergyInfo === '') {
            alert("Allergy Info cannot be empty :(")
            return false
        }else if (this.state.allergyCause === '') {
            alert("Allergy Cause cannot be empty :(")
            return false
        } else {
            this.updateAllergy(this.state)
        }
    };

    renderTableData() {
        return this.state.allergy.map((allergy, index) => {
            const {id, allergyInfo, allergyCause} = allergy //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{allergyInfo}</td>
                    <td>{allergyCause}</td>
                </tr>
            )
        })
    }

    renderNavBar() {
        if (this.state.profile.userType === "Patient") {
            return <PatientNavBar/>
        }
        else if (this.state.profile.userType = "Doctor") {
            return <DoctorNavBar/>
        }
    }

    render() {
        return (
            <div>
                {this.renderNavBar()}
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