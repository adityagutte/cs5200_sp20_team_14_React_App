import React from "react";
import {deletePersonPhone, logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";
import AdminNavBar from "../../react/AdminNavBar";

export default class DeletePersonPhone extends React.Component {

    state = {
        phones: [],
        profile: {
            username: '',
            userType: '',
            phoneId: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                phoneId: ''
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

    deletePhone = () =>
        deletePersonPhone(this.state.phoneId)
            .then(() => {
                alert("Phone has been removed! Refresh page to see changes :)")
            })


    validateDeletePhone = () => {
        if (this.state.phoneId === '') {
            alert("Phone ID cannot be empty :(")
            return false
        } else {
            this.deletePhone()
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
                        placeholder={"ENTER PHONE ID TO REMOVE PHONE"}/>
                    <br/>

                    <button
                        // onClick={this.validatePatientProfile}
                        onClick={this.validateDeletePhone}
                        className="btn btn-primary btn-block">
                        DELETE PHONE
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