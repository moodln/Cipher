import { connect } from 'react-redux';
import { fetchTweets } from '../../actions/tweet_actions';
import Tweets from './problem_index';

const mSTP = state => {
    return {
        problems: Object.values(state.tweets.all)
    }
};

const mDTP = dispatch => {
    return {
        fetchTweets: () => dispatch(fetchTweets())
    }
};

export default connect(mSTP, mDTP)(Tweets);