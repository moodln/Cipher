import React from "react";
import { Link } from "react-router-dom";
import SidebarContainer from "../sidebar/sidebar_container";

class About extends React.Component {
    constructor(props) {
        super(props);
        this.getLogIn = this.getLogIn.bind(this);
        this.getSign = this.getSignIn.bind(this);
        this.getProblems = this.getProblems.bind(this);
    }

    getLogIn() {
        if (!this.props.loggedIn) {
            return (
                <button>Login</button>
            )
        } else {
            return null;
        }
    }

    getSignIn() {
        if (!this.props.loggedIn) {
            return (
                <div className="nav-link-div">
                    <button className="nav-link">Signup</button>
                </div>
            )
        } else {
            return null;
        }
    }

    getProblems() {
        if (this.props.loggedIn) {
            return (
                <div className="nav-link-div">
                    <button className="nav-link">Problems</button>
                </div>
            )
        } else {
            return null;
        }
    }


    render() {
        return (
            <div className="page-with-sidebar">
                <SidebarContainer />
                <div className="problem-index container">
                    <section className="problem-index-header">
                        <div className="problem-index-header-div">
                            <div className="problem-intro">
                                <h1>Welcome to Cipher</h1>
                            </div>
                            <div>
                                <h4>Here's all you need to know</h4>
                            </div>
                        </div>
                    </section>
                    <section className="about-section">
                        <section className="splash-features">
                            <div className="splash-features-item">
                                <div className="splash-features-item-img-div left" >
                                    {/* <img src={graphic1} alt="Coding graphic" /> */}
                                </div>
                                <div className="splash-features-item-description right">
                                    {/* <h2>Integrated coding environment</h2> */}
                                    <h4>
                                        First, sign up and make an account or log in
                                    </h4>
                                </div>
                            </div>
                            <div className="splash-features-item">
                                <div className="splash-features-item-description left">
                                    {/* <h2>Live video</h2> */}
                                    <h4>
                                        Pick a problem to get started/ make a group
                                    </h4>
                                    <br></br>
                                    <h4>
                                        Choose from the problems page or from the side bar
                                    </h4>
                                </div>
                                <div className="splash-features-item-img-div right" >
                                    {/* <img src={graphic2} alt="Video graphic" /> */}
                                </div>
                            </div>
                            <div className="splash-features-item">
                                <div className="splash-features-item-img-div left" >
                                    {/* <img src={graphic3} alt="Groups and friends graphic" /> */}
                                </div>
                                <div className="splash-features-item-description right">
                                    {/* <h2>Groups & friends</h2> */}
                                    <h4>Work through the problem on your own or invite other collaborators
                                    </h4>
                                </div>
                            </div>
                            <div className="splash-features-item">
                                <div className="splash-features-item-description left">
                                    {/* <h2>Live video</h2> */}
                                    <h4>
                                        If you receive an invitation from someone, you'll be notified here
                                    </h4>
                                    <br></br>
                                </div>
                                <div className="splash-features-item-img-div right" >
                                    {/* <img src={graphic2} alt="Video graphic" /> */}
                                </div>
                            </div>
                            <div className="splash-features-item">
                                <div className="splash-features-item-img-div left" >
                                    {/* <img src={graphic3} alt="Groups and friends graphic" /> */}
                                </div>
                                <div className="splash-features-item-description right">
                                    {/* <h2>Groups & friends</h2> */}
                                    <h4>
                                        To work on previously saved problems/ groups, go to your dashboard
                                    </h4>
                                    <br></br>
                                    <h4>
                                        You can also select your groups from the side bar
                                    </h4>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </div>

        )
    }
}



export default About;