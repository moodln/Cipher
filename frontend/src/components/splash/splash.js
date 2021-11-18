import React from "react";
import { Link } from "react-router-dom";
import graphic1 from "../../assets/images/graphic_1.png";
import graphic2 from "../../assets/images/graphic_2.png";
import graphic3 from "../../assets/images/graphic_3.png";

class Splash extends React.Component {

    render() {
        return (
            <div className="splash-section container">
                <section className="splash-main">
                    <div className="splash-main-info-container">
                        <h1 className="splash-main-header">Come Together to Code</h1>
                        <h4 className="splash-main-subtitle">Everything you need in a collaborative coding environment</h4>
                        <Link to="/register" className="splash-code-btn">CODE</Link>
                    </div>
                </section>
                <section className="splash-summary">
                    <div className="splash-summary-item">
                        <h2 className="splash-summary-item-header">Code</h2>
                        <h4 className="splash-summary-item-subtitle">Choose from a selection of 100+ practice problems</h4>
                    </div>
                    <div className="splash-summary-item">
                        <h2 className="splash-summary-item-header">Collaborate</h2>
                        <h4 className="splash-summary-item-subtitle">Build strong connections with other developers using our video chat feature</h4>
                    </div>
                    <div className="splash-summary-item">
                        <h2 className="splash-summary-item-header">Cultivate</h2>
                        <h4 className="splash-summary-item-subtitle">Practice your algorithmic skills in a collaborative coding environment</h4>
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
                            <img src={graphic1} />
                        </div>
                        <div className="splash-features-item-description right">
                            <h2>Integrated coding environment</h2>
                            <h4>
                                Choose a practice problem from your home page
                                to automatically open a new document where you
                                can begin practicing your JavaScript skills with
                                our integrated Monaco Editor. With the use of web sockets, multiple
                                users can edit the same document, sending and
                                receiving live updates as they and their
                                collaborators type.
                            </h4>
                            <br></br>
                            <h4>
                                Save your work, close your browser, and step
                                away from your computer. When you come back,
                                you can access all the problems you have
                                edited from your dashboard.
                            </h4>
                        </div>
                    </div>
                    <div className="splash-features-item">
                        <div className="splash-features-item-description left">
                            <h2>Live video</h2>
                            <h4>
                                Collaborative code requires communication, and
                                communication requires face-to-face interaction.
                                Again with the use of websockets, send a video
                                request to a friend, giving them the option to
                                accept your incoming call and begin viewing your
                                lovely face.
                            </h4>
                        </div>
                        <div className="splash-features-item-img-div right" >
                            <img src={graphic2} />
                        </div>
                    </div>
                    <div className="splash-features-item">
                        <div className="splash-features-item-img-div left" >
                            <img src={graphic3} />
                        </div>
                        <div className="splash-features-item-description right">
                            <h2>Groups & friends</h2>
                            <h4>Browse from a list of users to
                                invite other developers to join your group. When
                                they accept your invitation, you can begin
                                working together immediately. Create as many
                                groups with as many collaborators as you want.
                            </h4>
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