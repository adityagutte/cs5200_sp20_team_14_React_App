import React from "react";
import {deletePatientInsurance, logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";
import AdminNavBar from "../../react/AdminNavBar";

export default class DeletePatientInsurance extends React.Component {

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

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllInsurances = () =>
        fetch("api/insurances/find/patient/" + this.state.profile.username)
            .then(response => response.json())
            .then(allInsurances => this.setState({
                insurance: allInsurances
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    deleteInsurance= () =>
        deletePatientInsurance(this.state.insuranceId)
            .then(() => {
                alert("Insurance has been removed! Refresh page to see changes :)")
            })


    validateDeleteInsurance = () => {
        if (this.state.insuranceId === '') {
            alert("Insurance ID cannot be empty :(")
            return false
        } else {
            this.deleteInsurance()
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
        } else if (this.state.profile.userType === "Doctor") {
            return <DoctorNavBar/>
        } else if (this.state.profile.userType === "Admin Staff") {
            return <AdminNavBar/>
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
                        placeholder={"ENTER INSURANCE ID TO REMOVE INSURANCE"}/>
                    <br/>

                    <button
                        // onClick={this.validatePatientProfile}
                        onClick={this.validateDeleteInsurance}
                        className="btn btn-primary btn-block">
                        DELETE INSURANCE
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