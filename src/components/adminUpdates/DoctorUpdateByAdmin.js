import React from "react"
import {logout, profile, updateDoctorInfo} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class DoctorUpdateByAdmin extends React.Component {

    state = {
        profile: {
            username: '',
            doctorUsername: '',
            password: '',
            userType: '',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            status: '',
            joiningDate: '',
            designation: '',
            education: '',
            certification: '',
            department: '',
            gender: 'Male',
        },
    }

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                doctorUsername: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                status: '',
                joiningDate: '',
                designation: '',
                education: '',
                certification: '',
                department: '',
                gender: 'Male',
            }))
    }

    isValidDate = (dateString) => {
        let regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;  // Invalid format
        let d = new Date(dateString);
        let dNum = d.getTime();
        if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    validateDoctorProfile = () => {
        if (this.state.doctorUsername === '') {
            alert("Doctor's username cannot be empty :(")
            return false
        } else if (this.state.firstName === '') {
            alert("First Name cannot be empty :(")
            return false
        } else if (this.state.lastName === '') {
            alert("Last Name cannot be empty :(")
            return false
        } else if (this.state.dateOfBirth === '') {
            alert("Date of Birth cannot be empty :(")
            return false
        } else if (!this.isValidDate(this.state.dateOfBirth)) {
            alert("Date of Birth format is invalid :(")
            return false
        } else if (this.state.joiningDate === '') {
            alert("Joining Date cannot be empty :(")
            return false
        } else if (!this.isValidDate(this.state.joiningDate)) {
            alert("Joining date format is invalid :(")
            return false
        } else if (this.state.designation === '') {
            alert("Designation cannot be empty :(")
            return false
        } else if (this.state.education === '') {
            alert("Education cannot be empty :(")
            return false
        } else {
            this.updateDoctorInfo(this.state)
        }
    };

    logout = () => logout()
        .then(status => this.props.history.push("/"))


    handleSelectGenderChange = event => {
        this.setState({gender: event.target.value});
        console.log(this.state)
    }

    handleSelectDeptChange = event => {
        this.setState({department: event.target.value});
        console.log(this.state)
    }

    updateDoctorInfo = (doctor) =>
        updateDoctorInfo(doctor, this.state.doctorUsername)
            .then((response) => {
                if (response.status === 500) {
                    console.log(response)
                    alert("Problem updating profile :o  Please check username again :)")

                } else {
                    console.log(response)
                    alert("Profile updated successfully :)")
                }
            });


    render() {
        return (
            <div>
                <AdminNavBar/>
                <hr/>
                Hi {this.state.profile.username}!
                <br/>
                <hr/>
                <h3>UPDATE A DOCTOR'S PROFILE</h3>
                <br/>
                <div>
                    <input
                        value={this.state.doctorUsername}
                        onChange={(e) => this.setState({
                            doctorUsername: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Enter username of Doctor to be updated"}/>
                    <br/>
                    <input
                        value={this.state.firstName}
                        onChange={(e) => this.setState({
                            firstName: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"First Name"}/>
                    <br/>
                    <input
                        value={this.state.lastName}
                        onChange={(e) => this.setState({
                            lastName: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Last Name"}/>
                    <br/>
                    <input
                        value={this.state.dateOfBirth}
                        onChange={(e) => this.setState({
                            dateOfBirth: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Date of Birth     (YYYY-MM-DD)"}/>
                    <br/>
                    <input
                        value={this.state.joiningDate}
                        onChange={(e) => this.setState({
                            joiningDate: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Date of Joining    (YYYY-MM-DD)"}/>
                    <br/>
                    <input
                        value={this.state.status}
                        onChange={(e) => this.setState({
                            status: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Status"}/>
                    <br/>
                    <input
                        value={this.state.designation}
                        onChange={(e) => this.setState({
                            designation: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Designation"}/>
                    <br/>
                    <input
                        value={this.state.education}
                        onChange={(e) => this.setState({
                            education: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Education"}/>
                    <br/>
                    <input
                        value={this.state.certification}
                        onChange={(e) => this.setState({
                            certification: e.target.value
                        })}
                        className={`form-control`}
                        placeholder={"Certification"}/>
                    <br/>
                    <div>
                        <select
                            className={"form-control"}
                            value={this.state.department}
                            onChange={this.handleSelectDeptChange}>
                            <option>ENT</option>
                            <option>CARDIOLOGY</option>
                            <option>GYNAECOLOGY</option>
                            <option>ORTHOPAEDIC</option>
                            <option>PEDIATRIC</option>
                        </select>
                    </div>
                    <br/>
                    <div>
                        <select
                            className={"form-control"}
                            value={this.state.gender}
                            onChange={this.handleSelectGenderChange}>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <br/>
                    <button
                        onClick={this.validateDoctorProfile}
                        className="btn btn-primary btn-block">
                        UPDATE
                    </button>
                </div>
                <hr/>
            </div>
        )
    }
}