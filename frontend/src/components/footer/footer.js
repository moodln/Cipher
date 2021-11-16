import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <section className="footer-section container">
                <div className="footer-names">
                    <h2>Rebecca Foster</h2>
                    <h2>Madeline Wilson</h2>
                    <h2>Maria Vaghani</h2>
                    <h2>Pasan Dharmasenar</h2>
                </div>
                <div className="footer-links">
                    <a href="#">Cipher GitHub</a>
                </div>
                <div className="footer-summary">
                    <p>We came up with this project because...</p>
                    <p>Some other stuff we have to say</p>
                </div>
            </section>
        )
    }

}

export default Footer;