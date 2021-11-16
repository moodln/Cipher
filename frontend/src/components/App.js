import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import ProblemIndexContainer from './problem_index/problem_index_container';
import GroupShowContainer from './group_show/group_show_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
// import TweetComposeContainer from './problem_index/tweet_compose_container';
import Splash from "./splash/splash";


const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/problems" component={ProblemIndexContainer} />
      <ProtectedRoute exact path="/groups/:groupId" component={GroupShowContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      {/* <ProtectedRoute exact path="/new_tweet" component={TweetComposeContainer} /> */}
    </Switch>
  </div>
);

export default App;
