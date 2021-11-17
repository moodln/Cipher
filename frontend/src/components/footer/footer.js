import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <section className="footer-section container">
                <div className="footer-names">
                    <a href="https://github.com/rebeccamrfoster"
                        target="_blank" rel="noopener noreferrer">
                        <h2>Rebecca Foster</h2>
                    </a>
                    <a href="https://github.com/moodln"
                        target="_blank" rel="noopener noreferrer">
                        <h2>Madeline Wilson</h2>
                    </a>
                    <a href="https://github.com/mariavaghani"
                        target="_blank" rel="noopener noreferrer">
                        <h2>Maria Vaghani</h2>
                    </a>
                    <a href="https://github.com/Arebiter"
                        target="_blank" rel="noopener noreferrer">
                        <h2>Pasan Dharmasena</h2>
                    </a>
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