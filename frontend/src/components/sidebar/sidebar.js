import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import user_search from "../user_search/user_search";


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
        this.makeGroup = this.makeGroup.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
    }

    componentDidMount() {
        this.props.fetchProblems();
        this.props.fetchUserGroups();

        // window.addEventListener("scroll", () => {
        //     if (window.scrollY > 10) {
        //         document.querySelector(".sidebar-section-div").className = "sidebar-section-div side-glow";
        //     } else {
        //         document.querySelector(".sidebar-section-div").className = "sidebar-section-div";
        //     }
        // })
    }

    makeGroup(problemId) {
        this.props.createGroupWithProblem(problemId)
            .then(groupResponse => {
                this.props.history.push(`/groups/${groupResponse.data._id}`)
            })
    }
    
    updateQuery(e) {
        e.preventDefault();
        this.setState({
            query: e.currentTarget.value
        })
    }

    render() {
        if (!this.props.problems) return null;

        return (
            <div className="sidebar-container container">
                <div className="sidebar-section-div">
                    <div className="sidebar-section">
                        <button className="sidebar-button">
                            <svg className="problems-svg bi bi-code-slash"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16">
                                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                            </svg>
                        </button>
                        <div className="sidebar-menu">
                            <div className='problem-search'>
                                <input type="text" placeholder='search' value={this.state.query} onChange={this.updateQuery} />
                            </div>
                            {
                                this.props.problems.filter(problem => {
                                        if (this.state.query === '') {
                                            return problem;
                                        } else if (problem.title.toLowerCase().includes(this.state.query.toLowerCase())) {
                                            
                                            return problem;
                                        }
                                })
                                .map(result => {
                                    return (
                                        <div className="sidebar-list-item"
                                            key={result._id}
                                            onClick={() => this.makeGroup(result._id)}>
                                            <p>{result.title}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <button className="sidebar-button">
                            <svg className="problems-svg bi bi-people"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                            </svg>
                        </button>
                        <div className="sidebar-menu">
                            {
                                this.props.groups.map(group => (
                                    <div className="sidebar-list-item" key={group._id}>
                                        <Link to={`/groups/${group._id}`}><p>{group.title}</p></Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <Link to="/about">
                            <button className="sidebar-button">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="problems-svg bi bi-people"
                                    viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar);