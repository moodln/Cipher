import React from "react";
import { Link } from "react-router-dom";

class Splash extends React.Component {

    render() {
        return (
            <div className="splash-section container">
                <section className="splash-main">
                    <div className="splash-main-info-container">
                        <h1 className="splash-main-header">Come together and Code</h1>
                        <h4 className="splash-main-subtitle">Work with friends </h4>
                        <Link to="/register" className="splash-code-btn">CODE</Link>
                    </div>
                </section>
                <section className="splash-summary">
                    <div className="splash-summary-item">
                        <h2 className="splash-summary-item-header">Thing 1</h2>
                        <h4 className="splash-summary-item-subtitle">Let's do thing 1</h4>
                    </div>
                    <div className="splash-summary-item">
                        <h2 className="splash-summary-item-header">Thing 2</h2>
                        <h4 className="splash-summary-item-subtitle">Let's do thing 2</h4>
                    </div>
                    <div className="splash-summary-item">
                        <h2 className="splash-summary-item-header">Thing 3</h2>
                        <h4 className="splash-summary-item-subtitle">Let's do thing 3</h4>
                    </div>
                </section>
                <section className="splash-signup">
                    <div className="splash-signup-content">
                        <h2>Get Started</h2>
                        <Link to="/register" className="splash-code-btn">CODE</Link>
                    </div>
                </section>
                <section className="splash-features">
                    <div className="splash-features-item">
                        <div className="splash-features-item-img-div left" >
                            <image></image>
                        </div>
                        <div className="splash-features-item-description right">
                            <h2>Feature 1</h2>
                            <h4>description of feature 1</h4>
                        </div>
                    </div>
                    <div className="splash-features-item">
                        <div className="splash-features-item-description left">
                            <h2>Feature 2</h2>
                            <h4>description of feature 2</h4>
                        </div>
                        <div className="splash-features-item-img-div right" >
                            <image></image>
                        </div>
                    </div>
                    <div className="splash-features-item">
                        <div className="splash-features-item-img-div left" >
                            <image></image>
                        </div>
                        <div className="splash-features-item-description right">
                            <h2>Feature 3</h2>
                            <h4>description of feature 3</h4>
                        </div>
                    </div>
                </section>
                <section className="splash-signup">
                    <div className="splash-signup-content">
                        <h2>Get Started</h2>
                        <Link to="/register" className="splash-code-btn">CODE</Link>
                    </div>
                </section>
            </div>
        )
    }
};

export default Splash;