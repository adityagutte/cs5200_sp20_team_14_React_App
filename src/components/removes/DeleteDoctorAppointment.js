import React from "react";
import {
    logout,
    profile,
    deleteDoctorAppointments
} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";
import DoctorNavBar from "../../react/DoctorNavBar";
import AdminNavBar from "../../react/AdminNavBar";

export default class DeleteDoctorAppointment extends React.Component {

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
        fetch("api/appointment/find/doctor/" + this.state.profile.username)
            .then(response => response.json())
            .then(allAppointments => this.setState({
                                                       appointments: allAppointments
                                                   }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));


    deleteAppointment = () =>
        deleteDoctorAppointments(this.state.appointmentId)
            .then(() => {
                alert("Appointment has been removed! Refresh page to see changes :)")
            })

    validateDeleteAppointments = () => {
        if (this.state.appointmentId === '') {
            alert("Appointment ID cannot be empty :(")
            return false
        } else {
            this.deleteAppointment()
        }
    };

    renderTableData() {
        return this.state.appointments.map((appointments, index) => {
            const {id, dateOfAppointment, notes, time} = appointments //destructuring
            const patientName = appointments.patient.firstName + " " + appointments.patient.lastName
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{dateOfAppointment}</td>
                    <td>{notes}</td>
                    <td>{time}</td>
                    <td>{patientName}</td>
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
                    <h2>APPOINTMENT INFORMATION</h2>
                    For user: <b>{this.state.profile.username} {this.state.profile.userType}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>Time</th>
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
                        onClick={this.validateDeleteAppointments}
                        className="btn btn-primary btn-block">
                        DELETE APPOINTMENTS
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