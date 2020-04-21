import React from "react";
import {profile, updatePatientInsurance} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class InsuranceUpdateByAllergies extends React.Component {

    state = {
        insurance: [],
        profile: {
            username: '',
            userType: '',
            insuranceId: '',
            insuranceDetails: '',
            insuranceType: ''
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                insuranceId: '',
                insuranceDetails: '',
                insuranceType: ''
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


    updateInsurance = (insurance) =>
        updatePatientInsurance(insurance, this.state.insuranceId)
            .then(() => {
                alert("Insurance has been updated :) Refresh page to see changes")
            })


    validateUpdateInsurance = () => {
        if (this.state.insuranceId === '') {
            alert("Insurance ID cannot be empty :(")
            return false
        } else if (this.state.insuranceDetails === '') {
            alert("Insurance Details cannot be empty :(")
            return false
        } else if (this.state.insuranceType === '') {
            alert("Insurance Type cannot be empty :(")
            return false
        } else {
            this.updateInsurance(this.state)
        }
    };

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
                <div>
                    <input
                        value={this.state.insuranceId}
                        onChange={(e) => this.setState({
                            insuranceId: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={"form-control"}
                        placeholder={"ENTER INSURANCE ID TO UPDATE INSURANCE"}/>
                    <br/>
                    <input
                        value={this.state.insuranceDetails}
                        onChange={(e) => this.setState({
                            insuranceDetails: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Insurance Details"}/>
                    <br/>
                    <div>
                        <input
                            value={this.state.insuranceType}
                            onChange={(e) => this.setState({
                                insuranceType: e.target.value
                            })}
                            className={"form-control"}
                            placeholder={"Insurance Type"}/>
                    </div>
                    <br/>
                    <button
                        onClick={this.validateUpdateInsurance}
                        className="btn btn-primary btn-block">
                        UPDATE INSURANCE
                    </button>
                </div>
                <br/>
            </div>
        );
    }
}