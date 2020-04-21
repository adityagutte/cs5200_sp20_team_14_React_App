import React from "react"
import {logout, profile, registerMedicalTest, registerMedication, registerPrescription} from "../../services/UserService";
import DoctorNavBar from "../../react/DoctorNavBar";

export default class PrescriptionReg extends React.Component {
    state = {
        profile: {
            username: '',
            password: '',
            patUsername: '',
            prescriptionDate: '',
            refillData: '',
            substitutionPermitted: 'false',
            medicineName: '',
            quantity: 0,
            price: 0.00,
            dosage: '',
            testType: '',
            testResults: '',
            testDate: ''
        },
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                patUsername: '',
                prescriptionDate: '',
                medicationDate: '',
                refillData: '',
                substitutionPermitted: 'false',
                medicineName: '',
                quantity: '',
                price: '',
                dosage: '',
                testType: '',
                testResults: '',
                testDate: ''
            }))
    }

    /**
     * Useful methods that perform fetch, validation and rendering.
     */
    logout = () => logout()
        .then(status => this.props.history.push("/"))

    isValidDate = (dateString) => {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid dateOfAppointment
        return d.toISOString().slice(0, 10) === dateString;
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    registerPrescription = (prescription) =>
        registerPrescription(prescription, this.state.username, this.state.patUsername)
            .then((response) => {
                if (response.status === 500 || this.isEmpty(response)) {
                    console.log(response)
                    alert("Prescription cannot be added :o" +
                        "Tip: Check patient username or prescription already exists!")
                } else {
                    console.log(response)
                    alert("Prescription added successfully :)")
                }
            });

    medicationRegister = (medication) =>
        registerMedication(medication, this.state.username, this.state.patUsername, this.state.prescriptionDate)
            .then((response) => {
                if (response.status === 500) {
                    console.log(response)
                    alert("Medication cannot be added :o  Prescription doesn't exist.  " +
                        "Tip: Create a prescription first :)")
                } else {
                    console.log(response)
                    alert("Medication added successfully :)")
                }
            });

    medicalTestRegistration = (medicalTest) =>
        registerMedicalTest(medicalTest, this.state.username, this.state.patUsername, this.state.prescriptionDate)
            .then((response) => {
                if (response.status === 500) {
                    console.log(response)
                    alert("Medical test cannot be added :o  Prescription doesn't exist. " +
                        "Tip: Create a prescription first :)")
                } else {
                    console.log(response)
                    alert("Medical Test added successfully :)")
                }
            });

    validatePrescription = () => {
        if (this.state.patUsername === '') {
            alert("Patient username cannot be empty :(")
            return false
        } else if (this.state.prescriptionDate === '') {
            alert("Prescription date cannot be empty :(")
            return false
        } else if (!this.isValidDate(this.state.prescriptionDate)) {
            alert("Date of Appointment is invalid :(")
            return false
        } else if (this.state.refillData === '') {
            alert("Refill data cannot be empty :(")
            return false
        } else {
            this.registerPrescription(this.state, this.state.username, this.state.patUsername)
        }
    };

    validateMedication = () => {
        if (this.state.medicineName === '') {
            alert("Drug name cannot be empty :(")
            return false
        } else if (this.state.quantity === '') {
            alert("Quantity cannot be empty :(")
            return false
        } else if (this.state.dosage === '') {
            alert("Dosage information cannot be empty :(")
            return false
        } else {
            this.medicationRegister(this.state)
        }
    };

    validateMedicalTest = () => {
        if (this.state.testType === '') {
            alert("Test type cannot be empty :(")
            return false
        }  else if (this.state.prescriptionDate === '') {
            alert("Test date cannot be empty :(")
            return false
        } else if (!this.isValidDate(this.state.prescriptionDate)) {
            alert("Test date is invalid :(")
            return false
        }  else {
            this.medicalTestRegistration(this.state)
        }

    };

    handleSelectSubstitutionChange = event => {
        this.setState({substitutionPermitted: event.target.value});
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <DoctorNavBar/>
                <hr/>
                <h1>PRESCRIPTION INFORMATION</h1>
                By doctor:  <b>{this.state.profile.username}</b>
                <hr/>
                <h3>ADD PRESCRIPTION FOR PATIENT</h3>
                <br/>
                <div>
                    <input
                        value={this.state.patUsername}
                        onChange={(e) => this.setState({
                            patUsername: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Patient's Username"}/>
                    <br/>
                    <input
                        value={this.state.prescriptionDate}
                        onChange={(e) => this.setState({
                            prescriptionDate: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Date on Prescription (YYYY-MM-DD)"}/>
                    <br/>

                    <input
                        value={this.state.refillData}
                        onChange={(e) => this.setState({
                            refillData: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Refill Data"}/>
                    <br/>

                    <div>
                        <select
                            className={"form-control"}
                            value={this.state.substitutionPermitted}
                            onChange={this.handleSelectSubstitutionChange}>
                            <option value={"false"}>Substitution allowed: NO</option>
                            <option value={"true"}>Substitution allowed: YES</option>
                        </select>
                    </div>
                    <br/>
                    <button
                        onClick={this.validatePrescription}
                        // onClick={() => this.registerAppointment(this.state)}
                        className="btn btn-primary btn-block">
                        ADD PRESCRIPTION
                    </button>
                    <br/>

                    <h3>ADD MEDICATION TO PRESCRIPTION</h3>
                    <hr/>
                    <input
                        value={this.state.medicineName}
                        onChange={(e) => this.setState({
                            medicineName: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Name of drug"}/>
                    <br/>
                    <input
                        value={this.state.quantity}
                        onChange={(e) => this.setState({
                            quantity: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Quantity"}/>
                    <br/>
                    <input
                        value={this.state.price}
                        onChange={(e) => this.setState({
                            price: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Cost"}/>
                    <br/>
                    <input
                        value={this.state.dosage}
                        onChange={(e) => this.setState({
                            dosage: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Dosage  (1--0--1)"}/>
                    <br/>
                    <button
                        onClick={this.validateMedication}
                        // onClick={() => this.medicationRegister(this.state)}
                        className="btn btn-primary btn-block">
                        ADD MEDICATION
                    </button>
                    <br/>

                    <h3>ADD MEDICAL TESTS TO PRESCRIPTION</h3>
                    <hr/>
                    <input
                        value={this.state.testType}
                        onChange={(e) => this.setState({
                            testType: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Test Type"}/>
                    <br/>
                    <input
                        value={this.state.testResults}
                        onChange={(e) => this.setState({
                            testResults: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Test Results (if any)"}/>
                    <br/>
                    <input
                        value={this.state.testDate}
                        onChange={(e) => this.setState({
                            testDate: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Test Date (YYYY-MM-DD)"}/>
                    <br/>

                    <button
                        onClick={this.validateMedicalTest}
                        // onClick={() => this.medicationRegister(this.state)}
                        className="btn btn-primary btn-block">
                        ADD MEDICAL TEST
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
        )
    }
}