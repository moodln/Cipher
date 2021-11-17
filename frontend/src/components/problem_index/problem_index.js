import React from 'react';
import { withRouter } from 'react-router-dom';

class ProblemIndex extends React.Component {
    componentDidMount() {
        this.props.fetchProblems();
    }

    // componentWillMount() {
    //     this.props.fetchProblems();
    // }

    render() {
        if (this.props.problems.length === 0) {
            return null;
        }
        return (
            <div className="problem-index container">
                <section className="problem-index-header">
                    <div className="problem-index-header-div">
                        <div className="problem-intro">
                            <h1>Solve problems at your own pace or with friends</h1>
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

                    <div className="problem-index-problems-list-div">
                        <div className="problem-index-problems-header-div">
                            <h1>ALL PROBLEMS</h1>
                        </div>
                        <ul className="problem-index-problems-list">
                            {
                                this.props.problems[0].map(problem => (
                                    // li onClick should create document and group,
                                    // then this.props.history.push(`/groups/${groupId}`) to group show page
                                    <li className="problem-card" key={problem}>
                                        <p className="problem-name">{problem.title}</p>
                                        <p>Open</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(ProblemIndex);