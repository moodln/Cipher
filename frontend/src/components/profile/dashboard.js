import React from 'react';
import { connect } from 'react-redux';
import GroupIndexContainer from '../group_index/group_index';
import SidebarContainer from "../sidebar/sidebar_container";


class Dashboard extends React.Component {
  render() {
    return (
      <div className="page-with-sidebar">
        <SidebarContainer />
        <div className="problem-index container">
          <section className="problem-index-header">
            <div className="problem-index-header-div">
              <div className="problem-intro">
                <h1>Welcome!</h1>
              </div>
            </div>
          </section>
          <GroupIndexContainer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
