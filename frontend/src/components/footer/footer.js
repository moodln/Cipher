import React from "react";
import FooterAuthorsInfo from "./footer_authors_info";
import portraitMadeline from "../../assets/images/portrait_madeline.png";
import portraitMaria from "../../assets/images/portrait_maria.jpg";
import portraitRebecca from "../../assets/images/portrait_rebecca.jpg";
import portraitPasan from "../../assets/images/portrait_pasan.jpeg";

class Footer extends React.Component {
    render() {
        return (
            <section className="footer-section">
                <div className="footer-authors-container">
                    <div className="footer-authors">
                        <div className="footer-portraits">
                            <img src={portraitMadeline} style={{ bottom: "-11px" }}
                                alt="Photograph of Madeline Wilson" />
                        </div>
                        <FooterAuthorsInfo name={"Madeline Wilson"}/>
                    </div>

                    <div className="footer-authors">
                        <div className="footer-portraits">
                            <img src={portraitMaria} style={{ bottom: "-32px", left: "-2px" }}
                                alt="Photograph of Maria Vaghani" />
                        </div>
                        <FooterAuthorsInfo name={"Maria Vaghani"} />
                    </div>

                    <div className="footer-authors">
                        <div className="footer-portraits">
                            <img src={portraitPasan} style={{ bottom: "-36px" }}
                                alt="Photograph of Pasan Dharmasena" />
                        </div>
                        <FooterAuthorsInfo name={"Pasan Dharmasena"} />
                    </div>

                    <div className="footer-authors">
                        <div className="footer-portraits">
                            <img src={portraitRebecca} style={{ bottom: "-32px" }}
                                alt="Photograph of Rebecca Foster" />
                        </div>
                        <FooterAuthorsInfo name={"Rebecca Foster"} />
                    </div>
                </div>

                <div className="footer-summary">
                    <p>
                        We are four software engineers who are passionate about 
                        coding, collaboration, and design.
                    </p>
                </div>

                <h4>&#169; 2021 Cipher</h4>
            </section>
        )
    }

}

export default Footer;