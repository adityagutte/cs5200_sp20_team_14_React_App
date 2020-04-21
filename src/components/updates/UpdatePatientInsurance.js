import React from "react";
import {updatePatientInsurance, logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";

export default class UpdatePatientInsurance extends React.Component {

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

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllInsurances = () =>
        fetch("api/insurances/find/patient/" + this.state.profile.username)
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
        }else if (this.state.insuranceDetails === '') {
            alert("Insurance Details cannot be empty :(")
            return false
        }else if (this.state.insuranceType === '') {
            alert("Insurance Type cannot be empty :(")
            return false
        } else {
            this.updateInsurance(this.state)
        }
    };

    renderTableData() {
        return this.state.insurance.map((insurance, index) => {
            const {id, insuranceDetails, insuranceType} = insurance //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{insuranceDetails}</td>
                    <td>{insuranceType}</td>
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
                    <h2>INSURANCE INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Insurance Details</th>
                        <th>Insurance Type</th>
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
                        // onClick={this.validatePatientProfile}
                        onClick={this.validateUpdateInsurance}
                        className="btn btn-primary btn-block">
                        UPDATE INSURANCE
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