import React from "react";
import {profile} from "../../services/UserService";

import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllAppointments extends React.Component {

    state = {
        appointments: [],
        profile: {
            username: '',
            userType: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                appointmentId: ''
            }))
            .then(this.findAllAppointments)
    }


    findAllAppointments = () =>
        fetch("api/appointments/find/all")
            .then(response => response.json())
            .then(allAppointments => this.setState({
                appointments: allAppointments
            }))
            .catch(() => alert("Can’t access response. Problem reaching API server :("));


    renderTableData() {
        return this.state.appointments.map((appointments, index) => {
            const {id, dateOfAppointment, notes, time} = appointments //destructuring
            const doctorName = appointments.doctor.firstName + " " + appointments.doctor.lastName
            const patientName = appointments.patient.firstName + " " + appointments.patient.lastName
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{dateOfAppointment}</td>
                    <td>{notes}</td>
                    <td>{time}</td>
                    <td>{doctorName}</td>
                    <td>{patientName}</td>
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
                    <h2>APPOINTMENT INFORMATION</h2>
                    For user: <b>{this.state.profile.username} {this.state.profile.userType}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Patient</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <hr/>
            </div>
        );
    }
}