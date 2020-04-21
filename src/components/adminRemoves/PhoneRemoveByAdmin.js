import React from "react";
import {logout, profile, deletePersonPhone} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class PhoneRemoveByAdmin extends React.Component {

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
        fetch("api/phones/find/all")
            .then(response => response.json())
            .then(allPhones => this.setState({
                                                 phones: allPhones
                                                }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));


    renderTableData() {
        return this.state.phones.map((phones, index) => {
            const {id, phone} = phones //destructuring
            const person = phones.person.firstName + " " + phones.person.lastName
            const personId = phones.person.id
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{phone}</td>
                    <td>{personId}</td>
                    <td>{person}</td>
                </tr>
            )
        })
    }

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

    render() {
        return (
            <div>
                <AdminNavBar/>
                <hr/>
                <div>
                    <h2>PHONE INFORMATION</h2>
                    For user: <b>{this.state.profile.username} {this.state.profile.userType}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Phone Number</th>
                        <th>Person ID</th>
                        <th>Person Name</th>
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