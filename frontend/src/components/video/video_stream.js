import React, { Component } from 'react'
import { connect } from 'react-redux'
// import io from "this.props.socket.io-client";
import Peer from "peerjs";
// import { this.props.socket } from '../../util/this.props.socket';

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
  async componentWillUnmount() {
    // window.removeEventListener("beforeunload", this.leaveThePage);
    // console.log('unmounting');
    await this.componentCleanup();
    
  }
  
  leaveThePage (e) {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      console.log('client on firefox');
      
      // e.preventDefault();
      // e.returnValue = "hey";
    }
    console.log('reloading page and disconnecting user');
    this.componentCleanup();
    // alert("you are about to lose connection")
    // const msg = "wtf"
    // return msg
    // this.componentCleanup();
    if (isFirefox) {
      e.returnValue = "hey";
      // return null;
    }
  }
  
  async componentCleanup() {
    console.log('USER IS GOING TO DISCONNECT');
    
    window.removeEventListener("beforeunload", this.leaveThePage);
    this.props.socket.emit("user-disconnected", { userId: this.props.userId, streamId: this.myVideoStream.id, groupId: this.props.groupId })
    this.myVideoStream.getTracks().forEach(track => track.stop());
    // this.props.socket.close();
    // console.log(`this.state.videos before unloading: `, this.state.videos);
    // console.log(`this.state.peers: `, this.state.peers);
  }

  
  componentDidMount() {
    window.addEventListener("beforeunload", this.leaveThePage);
    // console.log(`this.props.participants: `, this.props.participants);
    
    // this.this.props.socket = io();
    // this.this.props.socket = this.props.socket;
    // this.this.props.socket.on("send-peer-data", (data) => {
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
          console.log('call answered, streaming');
          const newPeers = Object.assign({}, this.state.peers);
          newPeers[userVideoStream.id] = call;
          this.setState({
            peers: newPeers
          })
          
          this.addVideoStream(userVideoStream, userVideoStream.id);
          
        });
      });
      
      this.props.socket.on("user-connected", (data) => {
        console.log('in user-connected sending my stream back to them');
        console.log(`this.myVideoStream.id: `, this.myVideoStream.id);
        console.log(`stream.id: `, stream.id);
        
        // if (data.userId === this.props.userId) {
          
          this.connectToNewUser(data.id, this.myVideoStream);
        // } else {
        //   // console.log('connected user, sending peer data');
        //   this.connectToNewUser(data.id, stream, data.userId)
          
        // }
      });
      
      this.props.socket.on("user-disconnected", (data) => {
        console.log(`streamId disconnecting: `, data.streamId);
        const newVideos = Object.assign({}, this.state.videos);
        // delete newVideos[data.streamId]
        // this.setState({ videos: newVideos })
        // console.log('going to close user ');
        const newPeers = Object.assign({}, this.state.peers);
        if (this.state.peers[data.streamId]) {
          newPeers[data.streamId].close(data.streamId);
        }
        delete newPeers[data.streamId]
        Object.keys(this.state.videos).forEach(peerId => {
          if (peerId !== this.myVideoStream.id) {
            if(!newPeers[peerId]) {
              delete newVideos[peerId]
            }
          }
        });
        this.setState({
          peers: newPeers,
          videos: newVideos
        })
      });
      
    });
    
      this.peer.on("open", (id) => {
        // console.log('joining room');
        // this.roomId = id;
        this.props.socket.emit("join-room", { groupId: this.props.groupId, userId: this.props.userId, id});
      });

 
  }

  connectToNewUser(id, stream) {
    console.log(`stream.id we are connecting: `, stream.id);
    // console.log(`userId we are connecting: `, userId);
    // console.log(`this.myVideoStream connecting to new user: `, this.myVideoStream);
    // console.log(`id: `, id);
    
    const call = this.peer.call(id, stream);
    call.on("stream", (userVideoStream) => {
      console.log('I have answered call and received stream ', userVideoStream.id);
      
      this.addVideoStream(userVideoStream);
      const newPeers = Object.assign({}, this.state.peers);
      newPeers[userVideoStream.id] = call;
      this.setState({
        peers: newPeers
      })

    });
    call.on("close", (streamId) => {
      console.log('in closing peer connection ', streamId);
      let newVideos = Object.assign({}, this.state.videos);
      delete newVideos[streamId]
      this.setState({ videos: newVideos })
    });
    // console.log(`this.peer: `, this.peer);
    
  }



  addVideoStream(stream) {
    // console.log('adding user stream: ', userId);
    console.log(`stream we are adding to videos: `, stream.id);
    
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
    if(!this.myVideoStream) return null;
    console.log(`this.state.videos in render: `, this.state.videos);
    console.log(`this.state.peers in render: `, this.state.peers);
    const videoMuteBtn = this.state.myVideoMuted ? "unmute Video" : "mute Video"
    const audioMuteBtn = this.state.myAudioMuted ? "unmute Audio" : "mute Audio"
    const ownVideo = this.state.videos[this.myVideoStream.id]
    const otherVideos = Object.values(this.state.videos).filter(stream => stream.id !== this.myVideoStream.id);
    return (
      <div id="video-grid">
        <div onClick={this.toggleVideo}>
          {videoMuteBtn}
        </div>
        <div onClick={this.toggleAudio}>
          {audioMuteBtn}
        </div>
        <ul>
          <li key={ownVideo.id}>
            <video
              ref={video => {
                if (video) { video.srcObject = ownVideo }
              }}
              autoPlay={true}
            >
            </video>
          </li>
          {
            otherVideos.map(stream => {
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
