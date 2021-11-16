import React from 'react';
import { withRouter } from 'react-router-dom';

class ProblemIndex extends React.Component {
    componentWillMount() {
        // this.props.fetchProblems();
    }

    render() {
        return (
            <div className="problem-index container">
                <section className="problem-index-header">
                    <div className="problem-index-header-div">
                        <div className="problem-intro">
                            <h1>Solve problems at your own page or with friends</h1>
                        </div>
                        <section className="problem-index-instructions">
                            <div className="problem-summary-item">
                                <h2 className="problem-summary-item-header">Code</h2>
                                <h4 className="problem-summary-item-subtitle">Choose from a selection of 100+ practice problems</h4>
                            </div>
                            <div className="problem-summary-item">
                                <h2 className="problem-summary-item-header">Collaborate</h2>
                                <h4 className="problem-summary-item-subtitle">Build strong connections with other developers using our video chat feature</h4>
                            </div>
                            <div className="problem-summary-item">
                                <h2 className="problem-summary-item-header">Cultivate</h2>
                                <h4 className="problem-summary-item-subtitle">Practice your algorithmic skills in a collaborative coding environment</h4>
                            </div>
                        </section>
                    </div>
                </section>
                <section className="problem-index-problems-section">
                    <h1>ALL PROBLEMS</h1>
                    <ul className="problem-index-problems-list">
                        {/* {
                    this.props.problems.map(problem => (
                        // li onClick should create document and group,
                        // then this.props.history.push(`/groups/${groupId}`) to group show page
                        <li key={problem}>
                            <p>{problem.title}</p>
                        </li>
                    ))
                } */}
                    </ul>
                </section>
            </div>
        )
    }
}

export default withRouter(ProblemIndex);