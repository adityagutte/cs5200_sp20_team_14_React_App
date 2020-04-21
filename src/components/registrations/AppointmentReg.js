import React from "react"
import {logout, profile, registerAppointment} from "../../services/UserService";
import DoctorNavBar from "../../react/DoctorNavBar";

export default class AppointmentReg extends React.Component {
    state = {
        profile: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            patUsername: '',
            dateOfAppointment: '',
            notes: '',
            time: '',
        },
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    registerAppointment = (address) =>
        registerAppointment(address, this.state.username, this.state.patUsername)
            .then((response) => {
                if (response.status === 500) {
                    console.log(response)
                    alert("Problem adding appointment :o  " +
                        "Tip: Check patient's username :)")
                } else {
                    console.log(response)
                    alert("Appointment added successfully :)")
                }
            });

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                firstName: '',
                lastName: '',
                patUsername:'',
                dateOfAppointment: '',
                notes: '',
                time: '',
            }))
    }

    isValidDate = (dateString) => {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid dateOfAppointment
        return d.toISOString().slice(0, 10) === dateString;
    }

    validateAppointment = () => {
        if (this.state.patUsername === '') {
            alert("Patient username cannot be empty :(")
            return false
        } else if (this.state.time === '') {
            alert("Time cannot be empty :(")
            return false
        } else if (!this.isValidDate(this.state.dateOfAppointment)) {
            alert("Date of Appointment is invalid :(")
            return false
        }  else {
            this.registerAppointment(this.state, this.state.username, this.state.patUsername)
        }

    };

    render() {
        return (
            <div>
                <DoctorNavBar/>
                <hr/>
                <h1>Appointment Information</h1>
                Hi {this.state.profile.username}!
                <hr/>
                <h3>Add appointments for your patients</h3>
                <br/>
                <div>
                    <input
                        value={this.state.patUsername}
                        onChange={(e) => this.setState({
                            patUsername: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Patient's Username"}/>
                    <br/>
                    <input
                        value={this.state.notes}
                        onChange={(e) => this.setState({
                            notes: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Notes"}/>
                    <br/>

                    <input
                        value={this.state.time}
                        onChange={(e) => this.setState({
                            time: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Time"}/>
                    <br/>

                    <input
                        value={this.state.dateOfAppointment}
                        onChange={(e) => this.setState({
                            dateOfAppointment: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Date (YYYY-MM-DD)"}/>
                    <br/>

                    <button
                        onClick={this.validateAppointment}
                        // onClick={() => this.registerAppointment(this.state)}
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
