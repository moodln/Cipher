import React from 'react';
import { withRouter } from 'react-router-dom';

class Tweet extends React.Component {
    // constructor(props) {
    //   super(props);

    //   this.state = {
    //     tweets: []
    //   }
    // }

    componentWillMount() {
        this.props.fetchTweets();
    }

    // componentWillReceiveProps(newState) {
    //   this.setState({ tweets: newState.tweets });
    // }

    render() {
        return (
            <div className="problem-index container">
                <h1>ALL PROBLEMS</h1>
                <ul className="problem-index-section">
                {
                    [1, 2, 3, 4, 5, 6].map(problem => (
                        <li key={problem}>
                            {problem}
                        </li>
                    ))
                }

                {
                    this.props.problems.map(problem => (
                        <li key={problem.id}>
                        </li>
                    ))
                }
                </ul>


            </div>
        )
    }
}

export default withRouter(Tweet);