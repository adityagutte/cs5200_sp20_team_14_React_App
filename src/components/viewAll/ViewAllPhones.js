import React from "react";
import {logout, profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllPhones extends React.Component {

    state = {
        phones: [],
        profile: {
            username: '',
            userType: '',
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
            </div>
        );
    }
}