import React from "react";
import {profile, updatePersonPhone} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class UpdatePhoneByAdmin extends React.Component {

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

    findAllPhones = () =>
        fetch("api/phones/find/all")
            .then(response => response.json())
            .then(allPhones => this.setState({
                phones: allPhones
            }))
            .catch(() => alert("Can’t access response. Blocked by browser?"));

    updatePhone = (phone) =>
        updatePersonPhone(phone, this.state.phoneId)
            .then(() => {
                alert("Phone has been updated :) Refresh page to see changes")
            })


    validateUpdatePhone = () => {
        if (this.state.phoneId === '') {
            alert("Phone ID cannot be empty :(")
            return false
        } else if (this.state.phone === '') {
            alert("Phone cannot be empty :(")
            return false
        } else {
            this.updatePhone(this.state)
        }
    };

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


    handleSelectPhoneChange = event => {
        this.setState({isPrimary: event.target.value});
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <AdminNavBar/>
                <hr/>
                <div>
                    <h2>PHONE INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
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
            </div>
        );
    }
}