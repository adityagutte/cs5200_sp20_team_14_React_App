import React from "react"
import {logout, profile, createSalaryForStaff} from "../../services/UserService";
import AdminNavBar from "../../react/AdminNavBar";

export default class SalaryReg extends React.Component {
    state = {
        profile: {
            username: '',
            userType: '',
            staffUsername: '',
            baseSalary: '',
            allowances: '',
            epf: ''
        }
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    createSalaryForStaff = (salary) =>
        createSalaryForStaff(salary, this.state.staffUsername)
            .then((response) => {
                if (response.status === 500 || this.isEmpty(response)) {
                    console.log(response)
                    alert("Problem adding salary :o" +
                        "Tip: Check patient username or salary exists already!")
                } else {
                    console.log(response)
                    alert("Salary added successfully :)")
                }
            });

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                profile: profile,
                username: profile.username,
                password: profile.password,
                staffUsername: '',
                baseSalary: '',
                allowances: '',
                epf: ''
            }))
    }

    validateSalary = () => {
        if (this.state.baseSalary === '') {
            alert("Base salary cannot be empty :(")
            return false
        } else if (this.state.epf === '') {
            alert("EPF cause cannot be empty :(")
            return false
        } else {
            this.createSalaryForStaff(this.state)
        }
    };

    render() {
        return (
            <div>
                <AdminNavBar/>
                <hr/>
                <h1>Contact Information</h1>
                Hi {this.state.profile.username}!
                <hr/>
                <h3>Add an allergy to your profile</h3>
                <br/>
                <div>

                    <input
                        value={this.state.staffUsername}
                        onChange={(e) => this.setState({
                            staffUsername: e.target.value
                        })}
                        className={"form-control"}
                        placeholder={"Username of Doctor or Staff"}/>
                    <br/>
                    <input
                        value={this.state.baseSalary}
                        onChange={(e) => this.setState({
                            baseSalary: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={"form-control"}
                        placeholder={"Base Salary"}/>
                    <br/>
                    <input
                        value={this.state.allowances}
                        onChange={(e) => this.setState({
                            allowances: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={`form-control`}
                        placeholder={"Allowances"}/>
                    <br/>
                    <input
                        value={this.state.epf}
                        onChange={(e) => this.setState({
                            epf: e.target.value
                        })}
                        type={"number"}
                        pattern="^[0-9]*$"
                        className={`form-control`}
                        placeholder={"EPF"}/>
                    <br/>
                    <button
                        onClick={this.validateSalary}
                        className="btn btn-primary btn-block">
                        SUBMIT
                    </button>
                </div>
                <br/>
            </div>
        )
    }
}
