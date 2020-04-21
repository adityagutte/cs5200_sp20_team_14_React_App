import React from "react"
import {logout, profile, registerPersonAddr} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";
import AdminNavBar from "../../react/AdminNavBar";

export default class PersonAddressReg extends React.Component {

    state = {
        profile: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            house: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: ''
        },

    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    registerPersonAddr = (address) =>
        registerPersonAddr(address, this.state.username)
            .then(() => {
                alert("Address added to profile successfully")
            });

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                house: '',
                street1: '',
                street2: '',
                city: '',
                state: '',
                zip: ''
            }))
    }

    validatePatientAddress = () => {
        if (this.state.house === '') {
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
        }
        else if (this.state.zip === '') {
            alert("Zip cannot be empty :(")
            return false
        } else {
            this.registerPersonAddr(this.state, this.state.username)
        }

    };

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
                <h1>Contact Information</h1>
                Hi {this.state.profile.username}!
                <hr/>
                <h3>Add address to your profile</h3>
                <br/>
                <div>
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
                        onClick={this.validatePatientAddress}
                        // onClick={() => this.registerPatientAddr(this.state)}
                        className="btn btn-primary btn-block">
                        SUBMIT
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
        )
    }
}