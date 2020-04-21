import React from "react";

const url = "users/find/all";
export default class WhiteBoardApp extends React.Component {
    state = {
        questions: []
    }

    componentDidMount() {
        this.findAllQuestions()
    }

    findAllQuestions = () =>
        fetch(url)
            .then(response => response.json())
            .then(allQuestions => this.setState({
                questions: allQuestions
            }))
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

    render() {
        return (
            <div>
                <h1>WELCOME TO JPA APPLICATION</h1>
                <h2>USERS</h2>

                <ul>
                    {
                        this.state.questions
                            .map(
                                question =>
                                    <li key={question.id}>
                                        <h4>User Id: {question.id}</h4>
                                        <h4>First Name:</h4>{question.firstName}
                                        <h4>Last Name:</h4>{question.lastName}
                                        {/*<h4>Type:</h4>{question.questionType}*/}
                                    </li>
                            )
                    }
                </ul>
            </div>
        )
    }
}