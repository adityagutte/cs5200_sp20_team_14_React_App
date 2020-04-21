import React from "react";
import {logout, profile, deletePersonAddress} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class AddressRemoveByAdmin extends React.Component {

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
        fetch("api/addresses/find/all")
            .then(response => response.json())
            .then(allAddresses => this.setState({
                addresses: allAddresses
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));


    renderTableData() {
        return this.state.addresses.map((address, index) => {
            const { id, house, street1, street2, city, state, zip } = address //destructuring
            const person = address.person.firstName + " " + address.person.lastName
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{house}</td>
                    <td>{street1}</td>
                    <td>{street2}</td>
                    <td>{city}</td>
                    <td>{state}</td>
                    <td>{zip}</td>
                    <td>{person}</td>
                </tr>
            )
        })
    }

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

    render() {
        return (
            <div>
                <AdminNavBar/>
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
                        <th>Person</th>
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