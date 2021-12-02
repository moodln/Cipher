import React from "react";
import { Link } from "react-router-dom";
import SidebarContainer from "../sidebar/sidebar_container";
import login from "../../assets/images/login.png";
import allProbs from "../../assets/images/all_probsB.png";
import pending from "../../assets/images/pending.png";
import dashboard from "../../assets/images/dashboardB.png";
import solve from "../../assets/images/solve_problem.png";

const About = () => (
    <div className="page-with-sidebar">
        {
            this.props.loggedIn ? <SidebarContainer /> : null
        }
        <div className="about-index container">
            <section className="about-index-header">
                <div className="about-index-header-div">
                    <div className="about-intro">
                        <h1>Welcome to Cipher</h1>
                    </div>
                    <div className="about-intro-sub">
                        <h4>Cipher is a collaborative coding platform designed to help you practice your data structures and algorithms in JavaScript.</h4>
                    </div>
                </div>
            </section>
            <section className="about-section">
                <section className="about-features">
                    <div className="about-features-item">
                        <div className="about-features-item-img-div" >
                            <img src={login} alt="login or signup" />
                        </div>
                        <div className="about-features-item-description">
                            {/* <h2>Integrated coding environment</h2> */}
                            <h4>
                                First, log in or sign up and make an account
                            </h4>
                            {
                                this.props.loggedIn ? (
                                    null
                                ) : (
                                    <div className="nav-link-div">
                                        <Link to="/register" className="nav-link">Sign Up</Link>
                                        <Link to="/login" className="nav-link">Log In</Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="about-features-item reverse">
                        <div className="about-features-item-img-div" >
                            <img src={allProbs} alt="Get problems" />
                        </div>
                        <div className="about-features-item-description">
                            {/* <h2>Live video</h2> */}
                            <h4>
                                Pick a problem to get started - problems are displayed on the home page and in the sidebar
                            </h4>
                            <br></br>
                            <h4>
                                Selecting a problem automatically creates a group
                            </h4>
                        </div>

                    </div>
                    <div className="about-features-item">
                        <div className="about-features-item-img-div" >
                            <img src={solve} alt="Solve problems" />
                        </div>
                        <div className="about-features-item-description">
                            {/* <h2>Groups & friends</h2> */}
                            <h4>Work through the problem on your own, or choose to invite collaborators
                            </h4>
                            <br></br>
                            <h4>
                                Collaborators will appear here if they have their cameras on
                            </h4>
                        </div>
                    </div>
                    <div className="about-features-item reverse">
                        <div className="about-features-item-img-div" >
                            <img src={pending} alt="Pending Invites" />
                        </div>
                        <div className="about-features-item-description">
                            {/* <h2>Live video</h2> */}
                            <h4>
                                If you receive an invitation to collaborate with someone, you'll be notified here
                            </h4>
                            <br></br>
                        </div>

                    </div>
                    <div className="about-features-item">
                        <div className="about-features-item-img-div" >
                            <img src={dashboard} alt="Dashboard" />
                        </div>
                        <div className="about-features-item-description">
                            {/* <h2>Groups & friends</h2> */}
                            <h4>
                                Your dashboard holds all previously saved problems & groups
                            </h4>
                            <br></br>
                            <h4>
                                These can also be found in the side bar
                            </h4>
                        </div>
                    </div>
                </section>
                <div className="about-link">
                    <h2 id="about-link-title">Get Started</h2>
                    {
                        this.props.loggedIn ? (
                            <div className="about-link-div">
                                <Link to="/problems" className="about-link-a">PROBLEMS</Link>
                            </div>
                        ) : (
                            <div className="about-link-div">
                                <Link to="/login" className="about-link-a">LOGIN</Link>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    </div>
)

export default About;