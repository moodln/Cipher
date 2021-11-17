import { connect } from "react-redux";
import { signup, login } from "../../actions/session_actions";
import SessionForm from "./session_form"

const mSTP = state => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    formType: "SIGN UP"
  };
};

const mDTP = dispatch => {
  return {
    signup: user => dispatch(signup(user)),
    demoLogin: user => dispatch(login(user))
  }
}

export default connect(mSTP, mDTP)(SessionForm);