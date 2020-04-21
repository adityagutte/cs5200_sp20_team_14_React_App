import React from "react";
import {logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewPersonAddrPhone extends React.Component {

    state = {
        phones: [],
        addresses: [],

        profile: {
            username: '',
            userType: ''
        },
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile
            }))
            .then(this.findAllAddresses)
            .then(this.findAllPhones)
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

    findAllPhones = () =>
        fetch("api/phones/find/persons/" + this.state.profile.username)
            .then(response => response.json())
            .then(allPhones => this.setState({
                phones: allPhones
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

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
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <ul>{this.state.addresses
                        .map(
                            address =>
                                <li key={address.id}>
                                    <h4>Address</h4>
                                    <p><b>House:</b> {address.house}</p>
                                    <p><b>Street 1:</b> {address.street1}</p>
                                    <p><b>Street 2:</b> {address.street2}</p>
                                    <p><b>City:</b> {address.city}</p>
                                    <p><b>State:</b> {address.state}</p>
                                    <p><b>Zip:</b> {address.zip}</p>
                                </li>
                        )
                    }
                    </ul>
                </div>
                <hr/>
                <div>
                    <h2>PHONE INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <ul>{this.state.phones
                        .map(
                            phone =>
                                <li key={phone.id}>
                                    <h4>Phone</h4>
                                    <p><b>Contact:</b> {phone.phone}</p>
                                    <p><b>Primary:</b> {phone.isPrimary}</p>
                                </li>
                        )
                    }
                    </ul>
                </div>
                <hr/>
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