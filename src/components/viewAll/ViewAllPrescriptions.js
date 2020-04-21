import React from "react";
import {profile} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class ViewAllPrescriptions extends React.Component {

    state = {
        prescriptions: [],
        profile: {
            username: '',
            userType: '',
        }
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile
            }))
            .then(this.findAllPrescriptions)
    }


    findAllPrescriptions = () =>
        fetch("api/prescriptions/find/all")
            .then(response => response.json())
            .then(allPrescriptions => this.setState({
                prescriptions: allPrescriptions
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    renderTableData() {
        return this.state.prescriptions.map((prescription, index) => {
            const {id, prescriptionDate, refillData} = prescription //destructuring
            const patientName = prescription.patient.firstName + " " + prescription.patient.lastName
            const doctorName = prescription.doctor.firstName + " " + prescription.doctor.lastName

            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{prescriptionDate}</td>
                    <td>{refillData}</td>
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
                    <h2>PRESCRIPTION INFORMATION</h2>
                    For user: <b>{this.state.profile.username} {this.state.profile.userType}</b>
                    <hr/>
                    <table id='table001'>
                        <tbody>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Patient Name</th>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                <hr/>
            </div>
        );
    }
}