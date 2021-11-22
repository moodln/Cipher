import React from "react";
import { withRouter } from "react-router-dom";
import SidebarContainer from "../sidebar/sidebar_container";

class ProblemIndex extends React.Component {
    constructor(props) {
        super(props);

        this.makeGroup = this.makeGroup.bind(this);
    }

    componentDidMount() {
        this.props.fetchProblems();
    }

    makeGroup(problemId) {
        this.props.createGroupWithProblem(problemId)
            .then(groupResponse => {
                this.props.history.push(`/groups/${groupResponse.data._id}`);
            })
    }

    render() {
        if (!this.props.problems) return null;

        return (
            <div className="page-with-sidebar">
                <SidebarContainer />
                <div className="problem-index container">
                    <section className="problem-index-header">
                        <div className="problem-index-header-div">
                            <div className="problem-intro">
                                <h1>Solve problems at your own pace or with friends</h1>
                            </div>
                            <section className="problem-index-instructions">
                                <div className="problem-summary-item">
                                    <h2 className="problem-summary-item-header">
                                        Code
                                    </h2>
                                    <h4 className="problem-summary-item-subtitle">
                                        Choose from a selection of 100+ practice problems
                                    </h4>
                                </div>
                                <div className="problem-summary-item">
                                    <h2 className="problem-summary-item-header">
                                        Collaborate
                                    </h2>
                                    <h4 className="problem-summary-item-subtitle">
                                        Build strong connections with other developers using our video chat feature
                                    </h4>
                                </div>
                                <div className="problem-summary-item">
                                    <h2 className="problem-summary-item-header">
                                        Cultivate
                                    </h2>
                                    <h4 className="problem-summary-item-subtitle">
                                        Practice your algorithmic skills in a collaborative coding environment
                                    </h4>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section className="problem-index-problems-section">

                        <div className="problem-index-problems-list-div">
                            <div className="problem-index-problems-header-div">
                                <h1>ALL PROBLEMS</h1>
                            </div>
                            <div className="problem-index-problems-div">
                                <ul className="problem-index-problems-list">
                                    {
                                        this.props.problems.map(problem => (
                                            <li className="problem-card"
                                                key={problem._id}
                                                onClick={() => this.makeGroup(problem._id)}>
                                                <p className="problem-name">{problem.title}</p>
                                                <p className="problem-body">{problem.body}</p>
                                                <div className="problem-link-div">
                                                    <button className="problem-link">OPEN</button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </section >
                </div >
            </div>
        )
    }
}

export default withRouter(ProblemIndex);