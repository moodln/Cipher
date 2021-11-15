import { combineReducers } from 'redux';
import errors from './errors_reducer';
import session from './session_reducer';
import TweetsReducer from './tweets_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  tweets: TweetsReducer
});

export default RootReducer;