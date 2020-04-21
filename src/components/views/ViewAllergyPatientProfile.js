import React from "react";
import {logout, profile} from "../../services/UserService";
import PatientNavBar from "../../react/PatientNavBar";

export default class ViewAllergyPatientProfile extends React.Component {
    state = {
        allergies: [],
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
            .then(this.findAllAllergies)
    }

    findAllAllergies = () =>
        fetch("api/allergies/find/patient/" + this.state.profile.username)
            .then(response => response.json())
            .then(allAllergies => this.setState({
                allergies: allAllergies
            }))
            .catch(() => console.log("Can’t access response. Blocked by browser?"));


    render() {
        return (
            <div>
                <PatientNavBar/>
                <hr/>
                <div>
                    <h2>ALLERGY INFORMATION</h2>
                    For user: <b>{this.state.profile.username}</b>
                    <hr/>
                    <ul>{this.state.allergies
                        .map(
                            allergies =>
                                <li key={allergies.id}>
                                    <h4>Allergy</h4>
                                    <p><b>Allergy Info:</b> {allergies.allergyInfo}</p>
                                    <p><b>Allergy Cause:</b> {allergies.allergyCause}</p>
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