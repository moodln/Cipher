import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import About from "./about";

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
});

export default withRouter(About);