import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.makeGroup = this.makeGroup.bind(this);
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
        // console.log(`problemId: `, problemId);
        this.props.createGroupWithProblem(problemId)
            .then(groupResponse => {
                // console.log(`groupResponse: `, groupResponse);
                this.props.history.push(`/groups/${groupResponse.data._id}`)
            })
    }

    render() {
        
        if (!this.props.problems) {
            return null;
        }
        console.log(this.props)
        return (
            <div className="sidebar-container container">
                <div className="sidebar-section-div">
                    <div className="sidebar-section">
                        <button className="sidebar-button">
                            <svg className="problems-svg bi bi-code-slash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                            </svg>
                        </button>
                        <div className="sidebar-menu">
                            {
                                this.props.problems.map(problem => {

                                    const problemId = problem._id
                                    return (
                                        <div className="sidebar-list-item" key={problem._id} onClick={() => this.makeGroup(problem._id)}>
                                            <p>{problem.title}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <button className="sidebar-button">
                            <svg className="problems-svg bi bi-files" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                            </svg>
                        </button>
                        <div className="sidebar-menu">
                            {
                                this.props.problems.map(problem => {

                                    const problemId = problem._id
                                    return (
                                        <div className="sidebar-list-item" key={problem._id}>
                                            <p>{problem.title}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <button className="sidebar-button">
                            <svg className="problems-svg bi bi-people" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                            </svg>
                        </button>
                        <div className="sidebar-menu">
                            {
                                this.props.groups.map(group => {

                                    
                                    return (
                                        <div className="sidebar-list-item" key={group._id}>
                                            <p>{group.title}</p>
                                            <Link to={`/groups/${group._id}`}>go</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Sidebar);