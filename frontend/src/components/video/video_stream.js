import React, { Component } from 'react'
import { connect } from 'react-redux'
// import io from "socket.io-client";
import Peer from "peerjs";
import { socket } from '../../util/socket';

class VideoStream extends Component {
  constructor(props) {
    super(props);
    this.connectToNewUser = this.connectToNewUser.bind(this);
    this.addVideoStream = this.addVideoStream.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.leaveThePage = this.leaveThePage.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);

    this.state = {
      peers: {},
      videos: {},
      myVideoMuted: true,
      myAudioMuted: true
    }
    
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.leaveThePage);
    // console.log('unmounting');
    this.componentCleanup();
    
  }

  leaveThePage (e) {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      // e.preventDefault();
      // e.returnValue = "hey";
    }
    this.componentCleanup();
    // alert("you are about to lose connection")
    console.log('reloading page and disconnecting user');
    // const msg = "wtf"
    // return msg
    // this.componentCleanup();
    if (isFirefox) {
      e.returnValue = "hey";
      // return null;
    }
  }
  
  componentCleanup() {
    socket.emit("user-disconnected", { userId: this.props.userId, streamId: this.myVideoStream.id, groupId: this.props.groupId })
    this.myVideoStream.getTracks().forEach(track => track.stop());
    // console.log(`this.state.videos before unloading: `, this.state.videos);
    // console.log(`this.state.peers: `, this.state.peers);
  }

  
  componentDidMount() {
    window.addEventListener("beforeunload", this.leaveThePage);
    // console.log(`this.props.participants: `, this.props.participants);
    
    // this.socket = io();
    // this.socket = socket;
    // this.socket.on("send-peer-data", (data) => {
    //     console.log(`data which is sent to new user: `, data);
        
    //   })
    this.peer = new Peer({
      path: "/",
      port: 443,
      secure: true,
      debug: 0,
    });
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
    .then((stream) => {
      this.myVideoStream = stream;
      // console.log('going to add own video');
      this.myVideoStream.getVideoTracks()[0].enabled = false;
      this.myVideoStream.getAudioTracks()[0].enabled = false;
      this.addVideoStream(this.myVideoStream, this.myVideoStream.id);
      this.peer.on("call", (call) => {
        
        call.answer(stream);
        console.log('in call');
        // console.log(`call: `, call);
        
        call.on("stream", (userVideoStream) => {
          // console.log('call answered, streaming');
          const newPeers = Object.assign({}, this.state.peers);
          newPeers[userVideoStream.id] = call;
          this.setState({
            peers: newPeers
          })
          
          this.addVideoStream(userVideoStream, userVideoStream.id);
          
        });
      });
      
      socket.on("user-connected", (data) => {
        // console.log('in user-connected');
        
        if (data.userId === this.props.userId) {
          
          this.connectToNewUser(data.id, this.myVideoStream, data.userId);
        } else {
          // console.log('connected user, sending peer data');
          this.connectToNewUser(data.id, stream, data.userId)
          
        }
      });
      
      socket.on("user-disconnected", (data) => {
        console.log(`streamId disconnecting: `, data.streamId);
        const newVideos = Object.assign({}, this.state.videos);
        delete newVideos[data.streamId]
        // this.setState({ videos: newVideos })
        if (this.state.peers[data.streamId]) {
          // console.log('going to close user ');
          const newPeers = Object.assign({}, this.state.peers);
          newPeers[data.streamId].close(data.streamId);
          delete newPeers[data.streamId]
          this.setState({
            peers: newPeers,
            videos: newVideos
          })
        }
      });
      
    });
    
      this.peer.on("open", (id) => {
        // console.log('joining room');
        this.roomId = id;
        socket.emit("join-room", { groupId: this.props.groupId, userId: this.props.userId, id});
      });

 
  }

  connectToNewUser(id, stream, userId) {
    // console.log(`stream.id we are connecting: `, stream.id);
    // console.log(`userId we are connecting: `, userId);
    // console.log(`this.myVideoStream connecting to new user: `, this.myVideoStream);
    // console.log(`id: `, id);
    
    const call = this.peer.call(id, stream);
    call.on("stream", (userVideoStream) => {
      // console.log('in stream newuser');
      
      this.addVideoStream(userVideoStream, userId);

    });
    call.on("close", (streamId) => {
      // console.log('in close');
      let newVideos = this.state.videos;
      delete newVideos[streamId]
      this.setState({ videos: newVideos })
    });
    const newPeers = Object.assign({}, this.state.peers);
    newPeers[stream.id] = call;
    this.setState({
      peers: newPeers
    })
    // console.log(`this.peer: `, this.peer);
    
  }



  addVideoStream(stream) {
    // console.log('adding user stream: ', userId);
    // console.log(`stream we are adding: `, stream);
    
    // console.log(`this.props.userId: `, this.props.userId);
    const newVideos = Object.assign({}, this.state.videos);
    newVideos[stream.id] = stream
    this.setState({
      videos: newVideos
    })

    
  }

  toggleVideo() {
    this.myVideoStream.getVideoTracks()[0].enabled = this.state.myVideoMuted;
    this.setState({
      myVideoMuted: !this.state.myVideoMuted
    })
  }

  toggleAudio() {
    this.myVideoStream.getAudioTracks()[0].enabled = this.state.myAudioMuted;
    this.setState({
      myAudioMuted: !this.state.myAudioMuted
    })
  }
  


  render() {
    console.log(`this.state.videos in render: `, this.state.videos);
    console.log(`this.state.peers in render: `, this.state.peers);
    const videoMuteBtn = this.state.myVideoMuted ? "unmute Video" : "mute Video"
    const audioMuteBtn = this.state.myAudioMuted ? "unmute Audio" : "mute Audio"
 
    return (
      <div id="video-grid">
        <div onClick={this.toggleVideo}>
          {videoMuteBtn}
        </div>
        <div onClick={this.toggleAudio}>
          {audioMuteBtn}
        </div>
        <ul>
          {
            Object.values(this.state.videos).map(stream => {
              return (
                <li key={stream.id}>
                  <video
                    ref={video => {
                      if (video) { video.srcObject = stream }
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
