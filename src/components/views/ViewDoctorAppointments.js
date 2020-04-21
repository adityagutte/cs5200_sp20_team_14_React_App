import React from "react";
import {logout, profile} from "../../services/UserService";
import DoctorNavBar from "../../react/DoctorNavBar";
import FormControl from "react-bootstrap/FormControl";
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default class ViewDoctorAppointments extends React.Component {
    state = {
        appointments: [],
        date: '',
        patUsername: '',
        appointmentsByDate: [],
        appointmentsByPatient: [],

        profile: {
            username: '',
            userType: ''
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                date: '',
                patUsername: '',
                appointmentsByDate: [],
                appointmentsByPatient: []
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

    findAllAppointmentsByDoctorOnDate = () =>
        fetch("api/doctor/" + this.state.profile.username + "/date/" + this.state.date + "/appointment")
            .then(response => response.json())
            .then(appointmentsByDate => this.setState({
                appointmentsByDate: appointmentsByDate
            })).then(() => {
            console.log(this.state.appointmentsByPatient)
        })
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    findAllAppointmentsByDoctorToPatient = () =>
        fetch("api/doctor/" + this.state.profile.username + "/patient/" + this.state.patUsername + "/appointment")
            .then(response => response.json())
            .then(appointmentsByPatient => this.setState({
                appointmentsByPatient: appointmentsByPatient
            })).then(() => {
            console.log(this.state.appointmentsByPatient)
        })
            .catch(() => console.log("Can’t access response. Blocked by browser?"));


    isValidDate = (dateString) => {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    validateSearch = () => {
        if (this.state.patUsername === '') {
            alert("Date cannot be empty :(")
            return false
        } else {
            this.findAllAppointmentsByDoctorToPatient()
        }

    };

    renderTableData() {
        return this.state.appointments.map((appointment, index) => {
            const {id, dateOfAppointment, notes, time} = appointment //destructuring
            const patientName = appointment.patient.firstName + " " + appointment.patient.lastName
            const patientUserName = appointment.patient.username
            return (
                <tr key={id}>
                    <td>{dateOfAppointment}</td>
                    <td>{notes}</td>
                    <td>{time}</td>
                    <td>{patientName}</td>
                    <td>{patientUserName}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <DoctorNavBar/>
                <hr/>
                <div>
                    <h2>APPOINTMENT INFORMATION</h2>
                    <Form inline>
                        <FormControl
                            value={this.state.patUsername}
                            onChange={(e) => this.setState({
                                patUsername: e.target.value
                            })}
                            type="text"
                            placeholder="Patient's Username"/>
                        <Button
                            onClick={this.validateSearch}
                            variant={"outline-primary"}>Search</Button>
                    </Form>
                    <br/>
                    <ul>{this.state.appointmentsByPatient
                        .map(
                            appointment =>
                                <li style={{color: "green"}}
                                    key={appointment.id}>
                                    <h4>Appointment</h4>
                                    <p><b>Date:</b> {appointment.dateOfAppointment}</p>
                                    <p><b>Time :</b> {appointment.time}</p>
                                    <p><b>Notes :</b> {appointment.notes}</p>
                                    <p><b>Patient :</b> {appointment.patient.firstName}</p>
                                </li>
                        )
                    }
                    </ul>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Patient Username</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}
