import React from "react";
import {logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";

export default class ViewPatientAppointments extends React.Component {
    state = {
        prescriptions: [],

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
            .then(this.findAllPrescriptions)
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    findAllPrescriptions = () =>
        fetch("api/prescription/find/patient/" + this.state.profile.username)
            .then(response => response.json())
            .then(allPrescriptions => this.setState({
                prescriptions: allPrescriptions
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    render() {
        return (
            <div>
                <PatientNavBar/>
                <hr/>
                <h2>PRESCRIPTION INFORMATION</h2>
                For user: <b>{this.state.profile.username}</b>
                <hr/>
                <ul>{this.state.prescriptions
                    .map(
                        prescription =>
                            <li key={prescription.id}>
                                <h4>Prescription</h4>
                                <hr/>
                                <p><b>Date:</b> {prescription.prescriptionDate}</p>
                                <p><b>Refill Data:</b> {prescription.refillData}</p>
                                <p><b>Doctor
                                    Name:</b> {prescription.doctor.firstName} {prescription.doctor.lastName}</p>
                                <p><b>Medical Test: </b></p>
                                <table id={"table001"}>
                                    {prescription.medicalTests.map(
                                        medicalTest =>
                                            <tr style={{color: "indianred"}} key={medicalTest.id}>
                                                <td><b>Type:</b> {medicalTest.testType}</td>
                                                <td><b>Results:</b> {medicalTest.testResults}</td>
                                                <td><b>Date:</b> {medicalTest.testDate}</td>
                                            </tr>
                                    )}
                                </table>

                                <p><b>Medication: </b></p>
                                <table id={"table001"}>
                                    {prescription.medications.map(
                                        medication =>
                                            <tr style={{color: 'cadetblue'}}
                                                key={medication.id}>
                                                <td><b>Drug Name:</b> {medication.medicineName}</td>
                                                <td><b>Quantity:</b> {medication.quantity}</td>
                                                <td><b>Dosage:</b> {medication.dosage}</td>
                                                <td><b>Price:</b> {medication.price}</td>
                                            </tr>
                                    )}
                                </table>
                            </li>
                    )
                }
                </ul>
            </div>
        );
    }
}
