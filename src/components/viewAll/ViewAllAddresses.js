import React from "react";
import {logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllAddresses extends React.Component {

    state = {
        addresses: [],
        profile: {
            username: '',
            userType: '',
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
            </div>
        );
    }
}