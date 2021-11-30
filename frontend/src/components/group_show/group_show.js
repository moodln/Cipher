import React from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchGroup, removeCurrentUserFromGroup } from "../../actions/group_actions";
import { selectGroupParticipants, selectUsersInvitedToGroup } from "../../selectors/users_selector";
import EditorShow from "../editor_show";
import SidebarContainer from "../sidebar/sidebar_container";
import { fetchDocument, updateDocument } from "../../actions/document_actions";
import InviteButton from "../ui_components/invite_button";
import VideoStreamContainer from "../video/video_stream";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.exitFromGroupAndGoToProblemsPage = this.exitFromGroupAndGoToProblemsPage.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId)
  }

  exitFromGroupAndGoToProblemsPage(e) {
    // e.preventDefault();
    this.props.exitFromGroup(this.props.match.params.groupId)
    this.props.history.push("/problems");
  }

  render() {
    if (!this.props.group) return null;
    if (!this.props.problem) return null;
    const { group } = this.props;
    

    return (
      <div className="page-with-sidebar">
        <SidebarContainer />
        <div className="group-show-container">
          <h1>{this.props.group.title}</h1>
          <span>Created: {new Date(this.props.problem.date).toDateString()}</span>
          <div className="group-show">
            <div className="group-bar-main">
              <div className="group-show-bar">
                <div className="group-show-main-problem">
                  <h2 className="group-show-main-problem-title">
                    {this.props.problem.title}
                  </h2>
                  <p>{this.props.problem.body}</p>
                
                </div>
                <div className="group-show-bar-participants">
                  <h1>Participants:</h1>
                  <ul className="participants-list">
                    {
                      this.props.participants.map(user => (
                        <li key={user["_id"]}>{user.handle}</li>
                      ))
                    }
                  </ul>
                </div>
              </div>

            <div className="group-show-main">
              <EditorShow updateDocument={this.props.updateDocument}
                document={this.props.group.document}
                groupId={this.props.group._id}
                userId={this.props.currentUserId} />
            </div>
            <div className="group-show-cams">
              <InviteButton groupId={this.props.group._id}
                participants={group.users}
                invitedUsers={this.props.invitedUsers.allIds} />
              <div className="cams">
                <VideoStreamContainer groupId={this.props.group._id} userId={this.props.currentUserId} participants={this.props.participants}/>
              </div>
              <div className="save-btn-div">
                {/* <button className="group-save-btn leave-btn"
                  onClick={this.exitFromGroupAndGoToProblemsPage}>
                  LEAVE GROUP
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const groupId = ownProps.match.params.groupId;
  if (Object.values(state.entities.groups.byId).length === 0) return {};
  if (Object.values(state.entities.problems.byId).length === 0) return {};
  if (!state.entities.groups.byId[groupId]) return {};

  const problemId = state.entities.groups.byId[groupId].document.problem;
  return {
    group: state.entities.groups.byId[groupId],
    problem: state.entities.problems.byId[problemId],
    participants: selectGroupParticipants(
      state.entities.users.byId,
      state.entities.groups.byId[groupId].users
    ),
    invitedUsers: selectUsersInvitedToGroup(
      state.entities.users.byId,
      state.entities.invites.byId,
      groupId
    ),
    currentUserId: state.session.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
  fetchDocument: documentId => dispatch(fetchDocument(documentId)),
  updateDocument: (document, newBody, groupId) => dispatch(
    updateDocument(document, newBody, groupId)
  ),
  exitFromGroup: (groupId) => dispatch(removeCurrentUserFromGroup(groupId))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupShow)
);