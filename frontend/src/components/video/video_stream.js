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

  leaveThePage(e) {
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
      socket.emit("join-room", { groupId: this.props.groupId, userId: this.props.userId, id });
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
    const audioMuteBtn = this.state.myAudioMuted ?
      (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="video-icon bi bi-mic-mute-fill" viewBox="0 0 16 16">
          <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z" />
          <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="video-icon bi bi-mic-fill" viewBox="0 0 16 16">
          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
        </svg>
      )
    const videoMuteBtn = this.state.myVideoMuted ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="video-icon bi bi-camera-video-off-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l6.69 9.365zm-10.114-9A2.001 2.001 0 0 0 0 5v6a2 2 0 0 0 2 2h5.728L.847 3.366zm9.746 11.925-10-14 .814-.58 10 14-.814.58z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="video-icon bi bi-camera-video-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
      </svg>
    )

    return (
      <div id="video-grid">
        <div className="video-icon-container">
          <div className="video-icon-div" onClick={this.toggleVideo}>
            {videoMuteBtn}
          </div>
          <div className="video-icon-div" onClick={this.toggleAudio}>
            {audioMuteBtn}
          </div>
        </div>
        <ul>
          {
            Object.values(this.state.videos).map(stream => {
              return (
                <li key={stream.id}>
                  <video className="video-item"
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
