import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {logout} from "../services/UserService";

export default class DoctorNavBar extends React.Component {

    handleSelect = (eventKey) => {
        if (eventKey == 2.1) {
            window.location.href = '/viewPersonAddrPhone'
        } else if (eventKey == 2.2) {
            window.location.href = '/viewSalary'
        } else if (eventKey == 3.1) {
            window.location.href = '/addAddress'
        } else if (eventKey == 3.2) {
            window.location.href = '/addPhone'
        } else if (eventKey == 3.3) {
            window.location.href = '/addSalary'
        } else if (eventKey == 3.6) {
            window.location.href = '/register'
        } else if (eventKey == 3.7) {
            window.location.href = '/register'
        } else if (eventKey == 4.1) {
            window.location.href = '/updateAdminStaffPersonalProfile'
        } else if (eventKey == 4.2) {
            window.location.href = '/updatePersonAddress'
        } else if (eventKey == 4.3) {
            window.location.href = '/updatePersonPhone'
        } else if (eventKey == 5.1) {
            window.location.href = '/deletePersonAddress'
        } else if (eventKey == 5.2) {
            window.location.href = '/deletePersonPhone'
        } else if (eventKey == 5.3) {
            window.location.href = '/deletePrescription'
        } else if (eventKey == 6.1) {
            window.location.href = '/viewAllDoctors'
        } else if (eventKey == 6.2) {
            window.location.href = '/viewAllPatients'
        } else if (eventKey == 6.3) {
            window.location.href = '/viewAllAdminStaff'
        } else if (eventKey == 6.4) {
            window.location.href = '/viewAllAddresses'
        } else if (eventKey == 6.5) {
            window.location.href = '/viewAllPhones'
        } else if (eventKey == 7.1) {
            window.location.href = '/viewAllAppointments'
        } else if (eventKey == 7.2) {
            window.location.href = '/viewAllPrescriptions'
        } else if (eventKey == 7.3) {
            window.location.href = '/viewAllSalaries'
        } else if (eventKey == 8.1) {
            window.location.href = '/viewAllAllergies'
        } else if (eventKey == 8.2) {
            window.location.href = '/viewAllInsurances'
        } else if (eventKey == 9.1) {
            window.location.href = '/doctorRemoveByAdmin'
        } else if (eventKey == 9.2) {
            window.location.href = '/patientRemoveByAdmin'
        } else if (eventKey == 9.4) {
            window.location.href = '/removeAddressByAdmin'
        } else if (eventKey == 9.5) {
            window.location.href = '/phoneRemoveByAdmin'
        }  else if (eventKey == 10.1) {
            window.location.href = '/prescriptionRemoveByAdmin'
        } else if (eventKey == 10.2) {
            window.location.href = '/appointmentRemoveByAdmin'
        } else if (eventKey == 11.1) {
            window.location.href = '/allergyRemoveByAdmin'
        } else if (eventKey == 11.2) {
            window.location.href = '/insuranceRemoveByAdmin'
        } else if (eventKey == 12.1) {
            window.location.href = '/updateDoctorByAdmin'
        } else if (eventKey == 12.2) {
            window.location.href = '/updatePatientByAdmin'
        } else if (eventKey == 12.3) {
            window.location.href = '/updateAdminStaffByAdmin'
        } else if (eventKey == 12.4) {
            window.location.href = '/updateAddressByAdmin'
        } else if (eventKey == 12.5) {
            window.location.href = '/updatePhoneByAdmin'
        } else if (eventKey == 13.1) {
            window.location.href = '/updateAppointmentByAdmin'
        } else if (eventKey == 13.2) {
            window.location.href = '/updateSalaryByAdmin'
        } else if (eventKey == 14.1) {
            window.location.href = '/updateAllergiesByAdmin'
        } else if (eventKey == 14.2) {
            window.location.href = '/updateInsurancesByAdmin'
        } else if (eventKey == 15) {
            logout()
                .then(status => window.location.href = '/')
        }
    };

    render() {

        return (
            <Nav
                variant="pills"
                activeKey="1"
                onSelect={this.handleSelect}
                fill={"true"}
            >
                <Nav.Item>
                    <Nav.Link eventKey="1" href="/adminStaffProfile">
                        PROFILE
                    </Nav.Link>
                </Nav.Item>
                <NavDropdown title="VIEW" id="nav-dropdown">
                    <NavDropdown.Item eventKey="2.1">Address / Phone</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item eventKey="2.2">Salary</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="ADD" id="nav-dropdown">
                    <NavDropdown.Item eventKey="3.1">Self Address</NavDropdown.Item>
                    <NavDropdown.Item eventKey="3.2">Self Phone</NavDropdown.Item>
                    <NavDropdown.Item eventKey="3.3">Salary</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item eventKey="3.6">Doctor</NavDropdown.Item>
                    <NavDropdown.Item eventKey="3.7">Patient</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="UPDATE" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1">Personal Details</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">Address Details </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">Phone Details </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="REMOVE" id="nav-dropdown">
                    <NavDropdown.Item eventKey="5.1">Address</NavDropdown.Item>
                    <NavDropdown.Item eventKey="5.2">Phone </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="VIEW DB" id="nav-dropdown">
                    <NavDropdown.Item eventKey="6.1">Doctors</NavDropdown.Item>
                    <NavDropdown.Item eventKey="6.2">Patients</NavDropdown.Item>
                    <NavDropdown.Item eventKey="6.3">Admin Staff</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item eventKey="6.4"> All Addresses</NavDropdown.Item>
                    <NavDropdown.Item eventKey="6.5">All Phones</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="VIEW DOCTOR" id="nav-dropdown">
                    <NavDropdown.Item eventKey="7.1">Appointments</NavDropdown.Item>
                    <NavDropdown.Item eventKey="7.2">Prescriptions</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item eventKey="7.3">Salaries</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="VIEW PATIENT" id="nav-dropdown">
                    <NavDropdown.Item eventKey="8.1">Allergies</NavDropdown.Item>
                    <NavDropdown.Item eventKey="8.2">Insurances</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="REMOVE FROM DB" id="nav-dropdown">
                    <NavDropdown.Item eventKey="9.1">Doctor</NavDropdown.Item>
                    <NavDropdown.Item eventKey="9.2">Patient</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item eventKey="9.4">Addresses</NavDropdown.Item>
                    <NavDropdown.Item eventKey="9.5">Phones</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="REMOVE DOCTOR" id="nav-dropdown">
                    <NavDropdown.Item eventKey="10.1">Prescriptions</NavDropdown.Item>
                    <NavDropdown.Item eventKey="10.2">Appointments</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="REMOVE PATIENT" id="nav-dropdown">
                    <NavDropdown.Item eventKey="11.1">Allergies</NavDropdown.Item>
                    <NavDropdown.Item eventKey="11.2">Insurances</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="UPDATE IN DB" id="nav-dropdown">
                    <NavDropdown.Item eventKey="12.1">Doctor</NavDropdown.Item>
                    <NavDropdown.Item eventKey="12.2">Patient</NavDropdown.Item>
                    <NavDropdown.Item eventKey="12.3">Admin Staff</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item eventKey="12.4">Addresses</NavDropdown.Item>
                    <NavDropdown.Item eventKey="12.5">Phones</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="UPDATE DOCTOR" id="nav-dropdown">
                    <NavDropdown.Item eventKey="13.1">Appointments</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item eventKey="13.2">Salary</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="UPDATE PATIENT" id="nav-dropdown">
                    <NavDropdown.Item eventKey="14.1">Allergies</NavDropdown.Item>
                    <NavDropdown.Item eventKey="14.2">Insurances</NavDropdown.Item>
                </NavDropdown>
                <Nav.Item class="logout">
                    <Nav.Link eventKey="15">
                        LOGOUT
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }

}