import React from "react";
import {logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";

export default class ViewPatientAppointments extends React.Component {
    state = {
        appointments: [],

        profile: {
            username: '',
            userType: ''
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile
            }))
            .then(this.findAllAppointments)
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllAppointments = () =>
        fetch("api/appointment/find/patient/" + this.state.profile.username)
            .then(response => response.json())
            .then(allAppointments => this.setState({
                appointments: allAppointments
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));


    render() {
        return (
            <div>
                <PatientNavBar/>
                <hr/>
                <div>
                    <h2>APPOINTMENT INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <ul>{this.state.appointments
                        .map(
                            appointment =>
                                <li key={appointment.id}>
                                    <h4>Appointment</h4>
                                    <p><b>Date:</b> {appointment.dateOfAppointment}</p>
                                    <p><b>Time :</b> {appointment.time}</p>
                                    <p><b>Notes :</b> {appointment.notes}</p>
                                    <p><b>Doctor :</b> {appointment.doctor.firstName} {appointment.doctor.lastName}</p>
                                </li>
                        )
                    }
                    </ul>
                </div>
            </div>
        );
    }
}
