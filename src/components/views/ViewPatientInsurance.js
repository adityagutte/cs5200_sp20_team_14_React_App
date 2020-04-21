import React from "react";
import {profile, logout} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";

export default class ViewPatientInsurance extends React.Component {
    state = {
        insurances: [],
        profile: {
            username: '',
            userType: '',

        },
    }

    logout = () => logout()
        .then(status => this.props.history.push("/"))

    componentDidMount() {
        profile()
            .then(profile => this.setState({
                                               profile: profile
                                           }))
            .then(this.findAllInsurances)
    }

    findAllInsurances = () =>
        fetch("api/insurances/find/patient/" + this.state.profile.username)
            .then(response => response.json())
            .then(allInsurances => this.setState({
                                                     insurances: allInsurances
                                                 }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));

    render() {
        return (
            <div>
                <PatientNavBar/>
                <hr/>
                <div>
                    <h2>INSURANCE INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <ul>{this.state.insurances
                        .map(
                            insurances =>
                                <li key={insurances.id}>
                                    <h4>Insurances</h4>
                                    <p><b>Insurance Details:</b> {insurances.insuranceDetails}</p>
                                    <p><b>Insurance Type:</b> {insurances.insuranceType}</p>
                                </li>
                        )
                    }
                    </ul>
                </div>
                <hr/>
            </div>
        );
    }
}

