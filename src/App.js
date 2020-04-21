// import React from 'react';
// import './App.scss';
// import {BrowserRouter as Router, Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
// import RegisterPerson from "./RegisterPerson";
// import Home from "./Home";
//
//


// function App() {
//     return (
//         <Router>
//             <div>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/topics">Topics</Link>
//                     </li>
//                 </ul>
//
//                 <Switch>
//                     <Route path="/about">
//                         <About/>
//                     </Route>
//                     <Route path="/topics">
//                         <Topics/>
//                     </Route>
//                     <Route path="/">
//                         <HomePage/>
//                     </Route>
//                 </Switch>
//             </div>
//         </Router>
//     );
// }
//
// function HomePage() {
//     // let match = useRouteMatch();
//
//     return (
//         <div>
//             <Home/>
//         {/*    <h2>Home</h2>*/}
//         {/*    <ul>*/}
//         {/*        <li>*/}
//         {/*            <Link to={`/login`}>Login</Link>*/}
//         {/*        </li>*/}
//         {/*        <li>*/}
//         {/*            <Link to={`/register`}>Register</Link>*/}
//         {/*        </li>*/}
//         {/*    </ul>*/}
//
//         {/*    <Switch>*/}
//         {/*        <Route path={`/register`}>*/}
//         {/*            <Register/>*/}
//         {/*        </Route>*/}
//         {/*        <Route path={match.path}>*/}
//         {/*            <h3>Not a user yet?*/}
//         {/*                Please Register.</h3>*/}
//         {/*        </Route>*/}
//         {/*    </Switch>*/}
//         </div>
//     );
// }
//
//
// function Register() {
//     return (
//         <div>
//             <h2>Register</h2>
//             <RegisterPerson/>
//         </div>
//     )
//
// }
//
// function About() {
//     return <h2>About</h2>;
// }
//
// function Topics() {
//     let match = useRouteMatch();
//
//     return (
//         <div>
//             <h2>Topics</h2>
//
//             <ul>
//                 <li>
//                     <Link to={`${match.url}/components`}>Components</Link>
//                 </li>
//                 <li>
//                     <Link to={`${match.url}/props-v-state`}>
//                         Props v. State
//                     </Link>
//                 </li>
//             </ul>
//
//             {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//             <Switch>
//                 <Route path={`${match.path}/:topicId`}>
//                     <Topic/>
//                 </Route>
//                 <Route path={match.path}>
//                     <h3>Please select a topic.</h3>
//                 </Route>
//             </Switch>
//         </div>
//     );
// }
//
// function Topic() {
//     let {topicId} = useParams();
//     return <h3>Requested topic ID: {topicId}</h3>;
// }

// function App() {
//   return (
//       <WhiteBoardApp/>
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//   );
// }

import React from 'react';
import './App.scss';
import AppManagerContainer from "./AppManagerContainer"
import 'bootstrap/dist/css/bootstrap.css'
import 'react-notifications/lib/notifications.css';
import DarkModeToggle from "./DarkModeToggle";

const App = () =>
    <div className={`container`}>
        <AppManagerContainer/>
        <DarkModeToggle/>
    </div>

export default App;
