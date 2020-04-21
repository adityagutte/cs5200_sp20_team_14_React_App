import React from "react"
import {profile, updateAppointment} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class AppointmentUpdateByAdmin extends React.Component {

    state = {
        appointments: [],

        profile: {
            username: '',
            password: '',
            userType: '',
            appointmentId: '',
            dateOfAppointment: '',
            notes: '',
            time: '',
        },
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                appointmentId: '',
                dateOfAppointment: '',
                notes: '',
                time: '',
            })).then(this.findAllAppointments)
    }

    findAllAppointments = () =>
        fetch("api/appointments/find/all")
            .then(response => response.json())
            .then(allAppointments => this.setState({
                appointments: allAppointments
            }))
            .catch(() => alert("Can’t access response. Problem reaching API server :("));


    isValidDate = (dateString) => {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    validateUpdateAppointment = () => {
        if (this.state.appointmentId === '') {
            alert("Appointment ID cannot be empty :(")
        } else if (this.state.time === '') {
            alert("Time cannot be empty :(")
            return false
        } else if (!this.isValidDate(this.state.dateOfAppointment)) {
            alert("Date of Appointment is invalid :(")
            return false
        } else {
            this.updateAppointment(this.state)
        }
    };

    updateAppointment = (appointment) =>
        updateAppointment(appointment, this.state.appointmentId)
            .then((response) => {
                if (response.status === 500) {
                    console.log(response)
                    alert("Problem updating appointment :o  ")

                } else {
                    console.log(response)
                    alert("Appointment updated successfully :) Reload page to view changes")
                }
            });

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
                Hi {this.state.profile.username}!
                <br/>
                <b>User Type:</b> {this.state.profile.userType}
                <br/>
                <hr/>
                <h3>APPOINTMENT INFORMATION</h3>
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
                <hr/>
                <br/>
                <div>
                    <input
                        value={this.state.appointmentId}
                        onChange={(e) => this.setState({
                            appointmentId: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={"form-control"}
                        placeholder={"ENTER APPOINTMENT ID TO UPDATE APPOINTMENT"}/>
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
                        onClick={this.validateUpdateAppointment}
                        className="btn btn-primary btn-block">
                        UPDATE APPOINTMENT
                    </button>
                </div>
                <hr/>
            </div>
        )
    }
}