import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mSTP = state => ({
        errors: state.errors.session,
        formType: "LOG IN"
});

const mDTP = dispatch => ({
        login: user => dispatch(login(user)),
        demoLogin: user => dispatch(login(user))
});

export default connect(mSTP, mDTP)(SessionForm);