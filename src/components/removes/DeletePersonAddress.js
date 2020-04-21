import React from "react";
import {logout, profile, deletePersonAddress} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";
import AdminNavBar from "../../react/AdminNavBar";

export default class DeletePersonAddress extends React.Component {

    state = {
        addresses: [],
        profile: {
            username: '',
            userType: '',
            addressId: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                addressId: ''
            }))
            .then(this.findAllAddresses)
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllAddresses = () =>
        fetch("api/address/find/persons/" + this.state.profile.username)
            .then(response => response.json())
            .then(allAddresses => this.setState({
                addresses: allAddresses
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    deleteAddress = () =>
        deletePersonAddress(this.state.addressId)
            .then(() => {
                alert("Address has been removed! Refresh page to see changes :)")
            })

    validateDeleteAddr = () => {
        if (this.state.addressId === '') {
            alert("Address ID cannot be empty :(")
            return false
        } else {
            this.deleteAddress()
        }
    };

    renderTableData() {
        return this.state.addresses.map((address, index) => {
            const { id, house, street1, street2, city, state, zip } = address //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{house}</td>
                    <td>{street1}</td>
                    <td>{street2}</td>
                    <td>{city}</td>
                    <td>{state}</td>
                    <td>{zip}</td>
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
                    <h2>ADDRESS INFORMATION</h2>
                    For user: <b>{this.state.profile.username} {this.state.profile.userType}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>House</th>
                        <th>Street1</th>
                        <th>Street2</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <hr/>
                <div>
                    <input
                        value={this.state.addressId}
                        onChange={(e) => this.setState({
                            addressId: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={"form-control"}
                        placeholder={"ENTER ADDRESS ID TO REMOVE ADDRESS"}/>
                    <br/>

                    <button
                        // onClick={this.validatePatientProfile}
                        onClick={this.validateDeleteAddr}
                        className="btn btn-primary btn-block">
                        DELETE ADDRESS
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