import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from "socket.io-client";
import Peer from "peerjs";

class VideoStream extends Component {
  componentDidMount() {
    let port = process.env.PORT || 3300;
    let myVideoStream;
    const socket = io("http://localhost:3300");
    this.peer = new Peer(undefined, {
      path: "/peerjs",
      host: "/",
      port: port,
    });
    this.videoGrid = document.getElementById("video-grid");
    const myVideo = document.createElement("video");
    myVideo.muted = true;
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    })
    .then((stream) => {
      myVideoStream = stream;
      this.addVideoStream(myVideo, stream);
        
      this.peer.on("call", (call) => {
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          this.addVideoStream(video, userVideoStream);
        });
      });
          
      socket.on("user-connected", (userId) => {
        this.connectToNewUser(userId, stream);
      });
    });
  }

  connectToNewUser (userId, stream) {
    const call = this.peer.call(userId, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      this.addVideoStream(video, userVideoStream);
    });
  }



  addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
       video.play();
       this.videoGrid.append(video);
    });
  }

  render() {
    return (
      <div id="video-grid">
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoStream)
