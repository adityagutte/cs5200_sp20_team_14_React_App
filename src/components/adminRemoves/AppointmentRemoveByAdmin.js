import React from "react";
import {logout, profile, deleteDoctorAppointments} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class AppointmentRemoveByAdmin extends React.Component {

    state = {
        appointments: [],
        profile: {
            username: '',
            userType: '',
            appointmentId: '',
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

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllAppointments = () =>
        fetch("api/appointments/find/all")
            .then(response => response.json())
            .then(allAppointments => this.setState({
                appointments: allAppointments
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));


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

    deleteAppointments = () =>
        deleteDoctorAppointments(this.state.appointmentId)
            .then(() => {
                alert("Appointment has been removed! Refresh page to see changes :)")
            })

    validateDeleteAppointment = () => {
        if (this.state.appointmentId === '') {
            alert("Appointment ID cannot be empty :(")
            return false
        } else {
            this.deleteAppointments()
        }
    };

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
                <div>
                    <input
                        value={this.state.appointmentId}
                        onChange={(e) => this.setState({
                            appointmentId: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={"form-control"}
                        placeholder={"ENTER APPOINTMENT ID TO REMOVE APPOINTMENT"}/>
                    <br/>

                    <button
                        // onClick={this.validatePatientProfile}
                        onClick={this.validateDeleteAppointment}
                        className="btn btn-primary btn-block">
                        DELETE APPOINTMENT
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