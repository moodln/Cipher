import React from 'react';
import { withRouter } from 'react-router-dom';

class ProblemIndex extends React.Component {
    componentWillMount() {
        this.props.fetchProblems();
    }

    render() {
        return (
            <div className="problem-index container">
                <h1>ALL PROBLEMS</h1>
                <ul className="problem-index-section">
                {
                    this.props.problems.map(problem => (
                        // li onClick should create document and group,
                        // then this.props.history.push(`/groups/${groupId}`) to group show page
                        <li key={problem}>
                            <p>{problem.title}</p>
                        </li>
                    ))
                }
                </ul>


            </div>
        )
    }
}

export default withRouter(ProblemIndex);