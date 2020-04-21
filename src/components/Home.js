import React from "react";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import {Button} from "react-bootstrap";

export default class Home extends React.Component {

    state = {
        countries: [],
        searchedCountry: [],

        search: ''
    }

    componentDidMount() {
        this.fetchCoronaAPI()
    }

    fetchCoronaAPI = () => {
        fetch("https://covid19-api.com/country/all?format=json", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": "daf0f3193bmsh4bcce10f9ab8ff6p192664jsnaa8ebf701dd3"
            }
        }).then(response => response.json())
            .then(country => {
                this.setState({
                    countries: country
                })
                console.log(this.state.countries)
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchCoronaAPICountry = () => {
        fetch("https://covid19-api.com/country?name=" + this.state.search + "&format=json", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": "daf0f3193bmsh4bcce10f9ab8ff6p192664jsnaa8ebf701dd3"
            }
        }).then(response => response.json())
            .then(country => {
                this.setState({
                    searchedCountry: country
                })
                console.log(this.state.countries)
            })
            .catch(err => {
                console.log(err);
            });
    }


    renderTableData() {
        return this.state.countries.map((nation, index) => {
            const {country, confirmed, critical, deaths, recovered} = nation //destructuring
            return (
                <tr key={1}>
                    <td>{country}</td>
                    <td>{confirmed}</td>
                    <td>{critical}</td>
                    <td>{deaths}</td>
                    <td>{recovered}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Nav
                        variant="pills"
                        activeKey="1"
                        onSelect={this.handleSelect}
                    >
                        <Nav.Item>
                            <Nav.Link eventKey="1" href="/">
                                HOME
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2"
                                      href="/login"
                                      title="Item">
                                LOGIN
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="3"
                                      href="/register">
                                REGISTER
                            </Nav.Link>
                        </Nav.Item>
                        <Form inline>
                            <FormControl
                                value={this.state.search}
                                onChange={(e) => this.setState({
                                    search: e.target.value
                                })}
                                type="text"
                                placeholder="Search country"/>
                            <Button
                                onClick={this.fetchCoronaAPICountry}
                                variant={"outline-primary"}>Search</Button>
                        </Form>
                    </Nav>
                </div>
                <br/>
                <ul>{this.state.searchedCountry
                    .map(
                        country =>
                            <li style={{color: "darkcyan"}}
                                key={0}>
                                <h4>COVID-19 DATA </h4>
                                <p><b>Country:</b> {country.country}</p>
                                <p><b>Confirmed :</b> {country.confirmed}</p>
                                <p><b>Critical :</b> {country.critical}</p>
                                <p><b>Deaths :</b> {country.deaths}</p>
                                <p><b>Recovered :</b> {country.recovered}</p>
                            </li>
                    )
                }</ul>
                <hr/>
                <h2>Health and Wellness Management Console</h2>
                <div>
                    <hr/>
                    <h4>COVID-19 Live Count:</h4>
                    <br/>
                    <div>
                        <table id='table002'>
                            <tbody>
                            <th>Country</th>
                            <th>Confirmed</th>
                            <th>Critical</th>
                            <th>Deaths</th>
                            <th>Recovered</th>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                    <hr/>
                    <br/>
                </div>
            </div>
        )
    }
}