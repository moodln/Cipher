import React from "react";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            handle: "",
            password: "",
            password2: "",
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemoLogin = this.handleDemoLogin.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return event => {
            this.setState({ [field]: event.target.value }, () => {
                const submitBtn = document.querySelector(".session-form-submit");
                if (this.props.formType === "SIGN UP" &&
                    this.state.email &&
                    this.state.handle &&
                    this.state.password &&
                    this.state.password2) {
                    submitBtn.classList.add("bright");
                }
                else if (this.props.formType === "LOG IN" &&
                    this.state.email &&
                    this.state.password) {
                    submitBtn.classList.add("bright");
                }
                else {
                    submitBtn.classList.remove("bright");
                }
            });
        };
    }

    handleDemoLogin() {
        let user = {
            email: "demo@user.com",
            password: "demouser"
        }
        this.props.demoLogin(user);
    }

    handleSubmit(event) {
        event.preventDefault();

        let user;
        if (this.props.formType === "SIGN UP") {
            user = {
                email: this.state.email,
                handle: this.state.handle,
                password: this.state.password,
                password2: this.state.password2
            };
            this.props.signup(user); // removed second argument this.props.history
        }
        else if (this.props.formType === "LOG IN") {
            user = {
                email: this.state.email,
                password: this.state.password
            };
            this.props.login(user);
        }
    }

    renderErrors() {
        return (
            <ul className="session-form-errors">
                {
                    Object.keys(this.state.errors).map((error, idx) => (
                        <li key={`error-${idx}`}>
                            {this.state.errors[error]}
                        </li>
                    ))
                }
            </ul>
        );
    }

    render() {
        return (
            <div className="session container">
                <form className="session-form">
                    {
                        this.props.formType === "SIGN UP" ? (
                            <>
                            <h1>Sign up for Cipher</h1>
                            <input type="text"
                                value={this.state.handle}
                                placeholder="Handle"
                                onChange={this.update("handle")} />
                            </>
                        ) : (
                            <h1>Log in to Cipher</h1>
                        )
                    }
                    
                    <input type="text"
                        value={this.state.email}
                        placeholder="Email"
                        onChange={this.update("email")} />

                    <input type="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.update("password")} />

                    {
                        this.props.formType === "SIGN UP" ? (
                            <input type="password"
                                value={this.state.password2}
                                placeholder="Confirm password"
                                onChange={this.update("password2")} />
                        ) : null
                    }

                    <input className="session-form-submit"
                        type="submit"
                        value="Submit" 
                        onClick={this.handleSubmit}/>
                    <input className="session-form-submit demo-login" 
                        type="button"
                        value="Demo Login"
                        onClick={this.handleDemoLogin} />
                    {this.renderErrors()}
                </form>
            </div>
        );
    }
}

export default SessionForm;