import React from 'react';
import { connect } from 'react-redux';
import GroupIndexContainer from '../group_index/group_index';


class Dashboard extends React.Component {
  render() {
    return (
    <div>
      <GroupIndexContainer />
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
