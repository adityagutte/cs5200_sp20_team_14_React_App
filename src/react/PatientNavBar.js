import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {logout} from "../services/UserService";

export default class PatientNavBar extends React.Component {

    handleSelect = (eventKey) => {
        if (eventKey == 4.1) {
            window.location.href = '/viewPersonAddrPhone'
        } else if (eventKey == 4.2) {
            window.location.href = '/viewAllergyPatientProfile'
        } else if (eventKey == 4.3) {
            window.location.href = '/viewPatientInsurances'
        } else if (eventKey == 5.1) {
            window.location.href = '/addAddress'
        } else if (eventKey == 5.2) {
            window.location.href = '/addPhone'
        } else if (eventKey == 5.3) {
            window.location.href = '/addAllergy'
        } else if (eventKey == 5.4) {
            window.location.href = '/addInsurance'
        } else if (eventKey == 6.1) {
            window.location.href = '/updatePatientPersonalProfile'
        } else if (eventKey == 6.2) {
            window.location.href = '/updatePersonAddress'
        } else if (eventKey == 6.3) {
            window.location.href = '/updatePersonPhone'
        } else if (eventKey == 6.4) {
            window.location.href = '/updatePatientAllergy'
        } else if (eventKey == 6.5) {
            window.location.href = '/updatePatientInsurance'
        } else if (eventKey == 7.1) {
            window.location.href = '/deletePersonAddress'
        } else if (eventKey == 7.2) {
            window.location.href = '/deletePersonPhone'
        } else if (eventKey == 7.3) {
            window.location.href = '/deletePatientAllergy'
        } else if (eventKey == 7.4) {
            window.location.href = '/deletePatientInsurance'
        } else if (eventKey == 8) {
            logout()
                .then(status => window.location.href = '/')
        }
    };
    
    render() {
        return (
            <div>
                <Nav
                    variant="pills"
                    activeKey="1"
                    onSelect={this.handleSelect}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="1" href="/patientProfile">
                            PROFILE
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2"
                                  href="/viewPatientAppointments"
                                  title="Item">
                            APPOINTMENTS
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="3"
                                  href="/viewPatientPrescriptions">
                            PRESCRIPTIONS
                        </Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="VIEW" id="nav-dropdown">
                        <NavDropdown.Item eventKey="4.1">Address / Phone</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item eventKey="4.2">Allergies</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.3">Insurances</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="ADD" id="nav-dropdown">
                        <NavDropdown.Item eventKey="5.1">Address</NavDropdown.Item>
                        <NavDropdown.Item eventKey="5.2">Phone</NavDropdown.Item>
                        <NavDropdown.Item eventKey="5.3">Allergy</NavDropdown.Item>
                        <NavDropdown.Item eventKey="5.4">Insurance</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="UPDATE" id="nav-dropdown">
                        <NavDropdown.Item eventKey="6.1">Personal Details</NavDropdown.Item>
                        <NavDropdown.Item eventKey="6.2">Address Details </NavDropdown.Item>
                        <NavDropdown.Item eventKey="6.3">Phone Details </NavDropdown.Item>
                        <NavDropdown.Item eventKey="6.4">Allergy Details</NavDropdown.Item>
                        <NavDropdown.Item eventKey="6.5">Insurance Details</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="REMOVE" id="nav-dropdown">
                        <NavDropdown.Item eventKey="7.1">Address</NavDropdown.Item>
                        <NavDropdown.Item eventKey="7.2">Phone </NavDropdown.Item>
                        <NavDropdown.Item eventKey="7.3">Allergy </NavDropdown.Item>
                        <NavDropdown.Item eventKey="7.4">Insurance</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item class="logout">
                        <Nav.Link eventKey="8">
                            LOGOUT
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        )
    }

}