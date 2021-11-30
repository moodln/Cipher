import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import About from "./about";

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps)(About));