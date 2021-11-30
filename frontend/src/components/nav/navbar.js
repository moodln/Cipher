import React from "react";
import { Link } from "react-router-dom";
import UserNotificationsContainer from "../ui_components/user_notifications";

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.handleClickSignup = this.handleClickSignup.bind(this);
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.handleClickAbout = this.handleClickAbout.bind(this);
        this.handleClickLogo = this.handleClickLogo.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout()
        this.props.history.push("/");
    }

    componentDidMount() {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                document.querySelector(".navbar-section").className = "navbar-section container glow";
            }
            else {
                document.querySelector(".navbar-section").className = "navbar-section container";
            }
        })
    }

    handleClickSignup() {
        if (this.props.location.pathname === "/register") {
            this.props.history.replace("/register");
        }
        else {
            this.props.history.push("/register");
        }
    }

    handleClickLogin() {
        if (this.props.location.pathname === "/login") {
            this.props.history.replace("/login");
        }
        else {
            this.props.history.push("/login");
        }
    }
    handleClickAbout() {
        if (this.props.location.pathname === "/about") {
            this.props.history.replace("/about");
        }
        else {
            this.props.history.push("/about");
        }
    }

    handleClickLogo() {
        if (this.props.location.pathname === "/") {
            this.props.history.replace("/");
        }
        else {
            this.props.history.push("/");
        }
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="nav-link-div">
                    {/* <div className="nav-link-profile-drop">
                        <div className="nav-link-profile-img-div">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="nav-link-profile-img bi bi-people"
                                viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                        </div>
                    </div> */}
                    <UserNotificationsContainer />
                    <div className="nav-link-profile-drop">
                        <div className="nav-link-profile-img-div">
                            <svg className="nav-link-profile-img bi bi-person"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>
                        </div>

                        <div className="nav-dropdown-content">
                            <Link className="nav-drop-link" to="/dashboard">
                                Dashboard
                            </Link>
                            <button className="nav-drop-link"
                                onClick={this.logoutUser}>Logout</button>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="nav-link-div">
                    <button className="nav-link"
                        onClick={this.handleClickAbout}>About</button>
                    <button className="nav-link"
                        onClick={this.handleClickSignup}>Signup</button>
                    <button className="nav-link"
                        onClick={this.handleClickLogin}>Login</button>
                </div>
            );
        }
    }

    render() {
        return (
            <section className="navbar-section container">
                <button className="logo"
                    onClick={this.handleClickLogo}>CIPHER</button>
                {this.getLinks()}
            </section>
        );
    }
}

export default NavBar;