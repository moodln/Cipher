import { RECEIVE_CURRENT_USER, REMOVE_CURRENT_USER, RECEIVE_USER_SIGN_IN } from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_CURRENT_USER:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_CURRENT_USER:
      
      return {
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_SIGN_IN:
      
      return {
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    default:
      return state;
  }
}

export default sessionReducer;