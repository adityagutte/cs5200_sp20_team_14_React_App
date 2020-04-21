import React from "react";
import {logout, profile, updatePersonAddress} from "../../services/UserService";
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
            house: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: ''
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                addressId: '',
                house: '',
                street1: '',
                street2: '',
                city: '',
                state: '',
                zip: ''
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

    updateAddress = (address) =>
        updatePersonAddress(address,this.state.addressId)
            .then(() => {
                alert("Address has been updated :) Refresh page to see changes.")
            })

    validateUpdateAddr = () => {
        if (this.state.addressId === '') {
            alert("Address ID cannot be empty :(")
            return false
        } else if (this.state.house === '') {
            alert("House cannot be empty :(")
            return false
        } else if (this.state.street1 === '') {
            alert("Street1 cannot be empty :(")
            return false
        } else if (this.state.city === '') {
            alert("City cannot be empty :(")
            return false
        } else if (this.state.state === '') {
            alert("State cannot be empty :(")
            return false
        } else if (this.state.zip === '') {
            alert("Zip cannot be empty :(")
            return false
        } else {
            this.updateAddress(this.state)
        }
    };

    renderTableData() {
        return this.state.addresses.map((address, index) => {
            const {id, house, street1, street2, city, state, zip} = address //destructuring
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
                        placeholder={"ENTER ADDRESS ID TO UPDATE ADDRESS"}/>
                    <br/>
                    <input
                        value={this.state.house}
                        onChange={(e) => this.setState({
                            house: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"House (Name, Number #)"}/>
                    <br/>
                    <input
                        value={this.state.street1}
                        onChange={(e) => this.setState({
                            street1: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Street1"}/>
                    <br/>
                    <input
                        value={this.state.street2}
                        onChange={(e) => this.setState({
                            street2: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Street 2 (optional)"}/>
                    <br/>

                    <input
                        value={this.state.city}
                        onChange={(e) => this.setState({
                            city: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"City"}/>
                    <br/>

                    <input
                        value={this.state.state}
                        onChange={(e) => this.setState({
                            state: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"State"}/>
                    <br/>

                    <input
                        value={this.state.zip}
                        onChange={(e) => this.setState({
                            zip: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Zip"}/>
                    <br/>
                    <button
                        onClick={this.validateUpdateAddr}
                        className="btn btn-primary btn-block">
                        UPDATE ADDRESS
                    </button>
                </div>
                <hr/>
            </div>
        );
    }
}