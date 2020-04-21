import React from "react";
import {updatePersonPhone, logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";
import AdminNavBar from "../../react/AdminNavBar";

export default class UpdatePersonPhone extends React.Component {

    state = {
        phones: [],
        profile: {
            username: '',
            userType: '',
            phoneId: '',
            phone: '',
            isPrimary: 'false'
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                phoneId: '',
                phone: '',
                isPrimary: 'false'
            }))
            .then(this.findAllPhones)
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllPhones = () =>
        fetch("api/phones/find/persons/" + this.state.profile.username)
            .then(response => response.json())
            .then(allPhones => this.setState({
                phones: allPhones
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    updatePhone = (phone) =>
        updatePersonPhone(phone, this.state.phoneId)
            .then(() => {
                alert("Phone has been updated :) Refresh page to see changes")
            })


    validateUpdatePhone = () => {
        if (this.state.phoneId === '') {
            alert("Phone ID cannot be empty :(")
            return false
        }else if (this.state.phone === '') {
            alert("Phone cannot be empty :(")
            return false
        } else {
            this.updatePhone(this.state)
        }
    };

    renderTableData() {
        return this.state.phones.map((phones, index) => {
            const {id, phone, isPrimary} = phones //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{phone}</td>
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

    handleSelectPhoneChange = event => {
        this.setState({isPrimary: event.target.value});
        console.log(this.state)
    }

    render() {
        return (
            <div>
                {this.renderNavBar()}
                <hr/>
                <div>
                    <h2>PHONE INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Phone Number</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>

                </div>
                <hr/>
                <div>
                    <input
                        value={this.state.phoneId}
                        onChange={(e) => this.setState({
                            phoneId: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={"form-control"}
                        placeholder={"ENTER PHONE ID TO UPDATE PHONE"}/>
                    <br/>
                    <input
                        value={this.state.phone}
                        onChange={(e) => this.setState({
                            phone: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Phone (###-##-####)"}/>
                    <br/>
                    <div>
                        <select
                            className={"form-control"}
                            value={this.state.isPrimary}
                            onChange={this.handleSelectPhoneChange}>
                            <option value={"false"}>No</option>
                            <option value={"true"}>Yes</option>
                        </select>
                    </div>
                    <br/>
                    <button
                        // onClick={this.validatePatientProfile}
                        onClick={this.validateUpdatePhone}
                        className="btn btn-primary btn-block">
                        UPDATE PHONE
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