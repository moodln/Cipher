import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from "socket.io-client";
import Peer from "peerjs";

class VideoStream extends Component {
  constructor(props) {
    super(props);
    this.connectToNewUser = this.connectToNewUser.bind(this);
    this.addVideoStream = this.addVideoStream.bind(this);
    this.muteVideo = this.muteVideo.bind(this);
    this.unmuteVideo = this.unmuteVideo.bind(this);
    this.state = {
      peers: {},
      videos: []
    }
  }
  componentWillUnmount(){
    console.log('unmounting');
    this.socket.emit("user-disconnected", {userId: this.props.userId, streamId: this.myVideoStream.id})

    console.log(`this.state.videos in unmount: `, this.state.videos);
    
    console.log(`this.state.peers: `, this.state.peers);
    
  }
  
  componentDidMount() {
    let port = process.env.PORT || 3500;
    this.socket = io();
    this.peer = new Peer(undefined, {
      path: "/peerjs",
      host: "https://cipher-mern.herokuapp.com/",
      port: 443,
    });
    this.videoGrid = document.getElementById("video-grid");
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    })
    .then((stream) => {
      this.myVideoStream = stream;
      console.log('going to add own video');
      
      this.addVideoStream(null, stream, this.props.userId);
      this.peer.on("call", (call) => {
        console.log('in call');
        
        call.answer(stream);
        call.on("stream", (userVideoStream) => {
          console.log('in stream');
          
          this.addVideoStream(null, userVideoStream, this.props.userId);
          
        });
      });
      
      this.socket.on("user-connected", (data) => {
        console.log('in user-connected');
        if (data.userId === this.props.userId) {

          this.connectToNewUser(data.id, this.myVideoStream, data.userId);
        } else {
          this.connectToNewUser(data.id, stream, data.userId);
        }
      });
      this.socket.on("user-muted-video", (data) => {
        console.log('in user-connected');
        if (data.userId === this.props.userId) {

          this.connectToNewUser(data.id, this.myVideoStream, data.userId);
        } else {
          this.connectToNewUser(data.id, stream, data.userId);
        }
      });
      this.socket.on("user-disconnected", (data) => {
        console.log('in user disconnected');
        console.log(`userId disconnecting: `, data.userId);
        let newVideos = this.state.videos;
        newVideos = newVideos.filter(streamInState => streamInState.id !== data.streamId);
        this.setState({videos: newVideos})
        if (this.state.peers[data.userId]) {
          console.log('going to close user ');
          const newPeers = Object.assign({}, this.state.peers);
          newPeers[data.userId].close(data.streamId);
          this.setState({
            peers: newPeers
          })
        }
      });
    });
      
    this.peer.on("open", (id) => {
      console.log('joining room');
      this.roomId = id;
      this.socket.emit("join-room", {groupId: this.props.groupId, userId: this.props.userId, id});
    });
    
  }
  
  connectToNewUser (id, stream, userId) {
    console.log(`stream.id we are connecting: `, stream.id);
    console.log(`this.myVideoStream connecting to new user: `, this.myVideoStream);
    
    const call = this.peer.call(id, stream);
    call.on("stream", (userVideoStream) => {
      console.log('in stream newuser');
      this.addVideoStream(null, userVideoStream, userId);
    });
    call.on("close", (streamId) => {
      console.log('in close');
      let newVideos = this.state.videos;
      newVideos = newVideos.filter(streamInState => streamInState.id !== streamId);
      this.setState({videos: newVideos})
    });
    const newPeers = Object.assign({}, this.state.peers);
    newPeers[userId] = call;
    this.setState({
      peers: newPeers
    })
    
  }



  addVideoStream(video, stream, userId) {
    console.log('adding user stream: ', userId);
    console.log(`this.props.userId: `, this.props.userId);
    
    
    let newVideos = this.state.videos.slice();
    console.log(`stream.id we are adding: `, stream.id);
    
    if (newVideos.some(streamInState => streamInState.id === stream.id)) {
      // const index = newVideos.indexOf(stream);
      
      // newVideos[index] = stream;
      
    } else {
      newVideos.push(stream)
    }
    
    this.setState({videos: newVideos})
  }

  muteVideo() {
    console.log(`this.myVideoStreamId we are muting: `, this.myVideoStream.id);
    this.state.videos.forEach(stream => {
      if (stream.id === this.myVideoStream.id) {
        stream.getTracks().forEach(track => {
          if (track.kind === "video") {
            let newVideos = this.state.videos;
            newVideos = newVideos.filter(streamInState => streamInState.id !== this.myVideoStream.id);
            this.setState({videos: newVideos})
            this.socket.emit("user-disconnected", {userId: this.props.userId, streamId: this.myVideoStream.id})
            // this.socket.emit("user-muted-video", {userId: this.props.userId, streamId: this.myVideoStream.id})
          }
        });
      }
    });
  }

  unmuteVideo(){
    console.log('unmuting');
    this.addVideoStream(null, this.myVideoStream, this.props.userId);
    this.socket.emit("join-room", {groupId: this.props.groupId, userId: this.props.userId, id: this.roomId})
  }
      
  render() {
    console.log(`this.state.videos in render: `, this.state.videos);
    
    return (
      <div id="video-grid">
        <div onClick={this.muteVideo}>
          mute Video
        </div>
        <div onClick={this.unmuteVideo}>
          unmute Video
        </div>
          <ul>
            {
            
            this.state.videos.map(stream => {
              
                
                return (
                <li key={stream.id}>
                  <video
                    ref={video => {
                      if (video) {video.srcObject = stream}
                    }}
                    autoPlay={true}
                  >
                  </video>
                </li>
              )
            
              })
            }
          </ul>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoStream)
