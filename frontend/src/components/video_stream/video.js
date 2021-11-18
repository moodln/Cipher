// import React, { useEffect, useRef, useState} from 'react';
// // use to copy Id
// // import { CopyToClipboard } from 'react-copy-to-clipboard';


// import io from 'socket.io-client';




// function Video() {
//     // peer to peer connection
//     const Peer = require('simple-peer');
//     const socket = io.connect('http://localhost:3300')
//     // construct initial state
//     const [ myId, setMyId ] = useState('')
//     const [ stream, setStream ] = useState()
//     const [ activeSockets, setActiveSockets ] = useState([])
//     const [ receivingCall, setReceivingCall ] = useState(false)
//     const [ caller, setCaller ] = useState('')
//     const [ callerSignal, setCallerSignal ] = useState()
//     const [ callAccepted, setCallAccepted ] = useState(false)
//     const [ idToCall, setIdToCall ] = useState('')
//     const [ callEnded, setCallEnded ] = useState(false)
//     const [ name, setName ] = useState('')

//     // we use useRef so that we can attach to html element 'ref' later
//     // reference video
//     const myVideo = useRef()
//     const oppositeVideo = useRef()
//     // disconnect when call ends
//     const connectionRef = useRef()

//     // set everything on initial load
//     useEffect(() => {
//         // will ask for permission to use webcam, then assign the video stream to myVideo to stream locally
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true})
//             .then(stream => {
//                 console.log(stream)
//                 // add stream to state
//                 setStream(stream)
//                 // set reference to video to stream coming in from webcam
//                 myVideo.current.srcObject = stream
//             })

//             socket.on('myId', (id) => {
//                 // grab id from backend and set it to frontend id
//                 setMyId(id)
//             })

//             socket.on('callUser', (data) => {
//                 setReceivingCall(true)
//                 setCaller(data.from)
//                 setName(data.name)
//                 setCallerSignal(data.signal)
//             })
//     }, [])

//     // create a new peer
//     const callUser = (id) => {
//         const peer = new Peer({
//             initiator: true,
//             trickle: false, 
//             stream: stream
//         })

//         peer.on('signal', (data) => {
//             socket.emit('callUser', {
//                 userToCall: id, 
//                 signalData: data, 
//                 from: myId,
//                 name: name
//             })
//         })

//         peer.on('stream', (stream) => {
//             console.log(stream)
//             oppositeVideo.current.srcObject = stream 
//         })

//         socket.on('callaccepted', (signal) => {
//             setCallAccepted(true)
//             peer.signal(signal)
//         })

//         connectionRef.current = peer
//     }

//     const answerCall = () => {
//         setCallAccepted(true)
//         const peer = new Peer({
//             initiator: false, 
//             trickle: false, 
//             stream: stream
//         })

//         peer.on('signal', (data) => {
//             socket.emit('answerCall', {signal: data, to: caller})
//         })

//         peer.on('stream', (stream) => {
//             console.log(stream)
//             console.log(oppositeVideo)
//             console.log(myVideo)
//             oppositeVideo.current.srcObject = stream
//         })

//         peer.signal(callerSignal)

//         connectionRef.current = peer
//     }

//     const leaveCall = () => {
//         setCallEnded(true)
//         connectionRef.current.destroy()
//     }

//     return (
//         <div className='video-container'>
//             <div className='video' >
//                 {/* terniary for return statement */}
//                 {stream && <video playsInline muted ref={myVideo} autoPlay className="local-video" id="local-video" />}
//             </div>
//             <div className='video'>
//                 {callAccepted && !callEnded ? 
//                 <video playsInline ref={oppositeVideo} autoPlay className="remote-video" id="remote-video"/> : null }
//             </div>
//             <input type="text" 
//                 value={name} 
//                 style={{background: 'white', color: 'black'}}
//                 onChange={e => setName(e.target.value)} />
//             <input type="text" 
//                 value={idToCall} 
//                 style={{background: 'white', color: 'black'}}
//                 onChange={e => setIdToCall(e.target.value)} />
//             <textarea name={myId} value={myId}id="" cols="30" rows="10"></textarea>
//             <div>
//                 {callAccepted && !callEnded ? (
//                     <button onClick={leaveCall}>end call</button>
//                 ) : (
//                     <button onClick={() => callUser(idToCall)}>call</button>
//                 )}
//                 {idToCall}
//             </div>
//             <div>
//                 {receivingCall && !callAccepted ? (
//                     <div>
//                         <h1>{name} is calling...</h1>
//                         <button onClick={answerCall}>answer</button>
//                     </div>
//                 ) : null}
//             </div>
//         </div>
//     )
// }

// export default Video;



import React, { useState, useRef, useEffect } from 'react';
import adapter from 'webrtc-adapter';
import io from 'socket.io-client';


function Video() {

    const socket = io.connect('http://localhost:3300')
    const Peer = require('simple-peer');

    const [ localUser, setLocalUser ] = useState();
    const [ call, setCall ] = useState({});
    const [ accepted, setAccepted ] = useState(false);
    const [ stream, setStream ] = useState();
    const [ ended, setEnded ] = useState(false);
    const [ remoteId, setRemoteId ] = useState();

    const localVideo = useRef();
    const remoteVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
            .then(stream => {
                setStream(stream);
                localVideo.current.srcObject = stream;
            })

        socket.on('localUser', id => {
            setLocalUser(id)
        })

        socket.on('makeCall', ({from, signal}) => {
            setCall({
                receivingCall: true, 
                from, 
                signal
            })
        })
    }, []);

    const makeCall = (id) => {
        const peer = new Peer({
            initiator: true, 
            trickle: false, 
            stream: stream
        })

        peer.on('signal', data => {
            socket.emit('makeCall', {
                remoteUser: id, 
                signalData: data, 
                from: localUser,
            })
        })

        peer.on('stream', currentStream => {
            remoteVideo.current.srcObject = currentStream;
        })

        socket.on('answer', signal => {
            setAccepted(true);
            peer.signal(signal)
        })

        connectionRef.current = peer;
    }

    const answer = () => {
        setAccepted(true);

        const peer = new Peer({
            initiator: false,
            trickle: false, 
            stream: stream
        })

        peer.on('signal', data => {
            socket.emit('answer', {
                signal: data, 
                to: call.from
            })
        })

        peer.on('stream', (currentStream) => {
            remoteVideo.current.srcObject = currentStream;
        })

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const endCall = () => {
        setEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }
    
    
    return (
        <div className="video-container">
            <div className='userId'>My user id: {localUser}</div>
            <video className='localVideo' playsInline muted ref={localVideo} autoPlay ></video>
            <input type="text" value={remoteId} onChange={(e) => setRemoteId(e.target.value)}/>
            
            {accepted && !ended ? (
                <div>
                    <video className='remoteVideo' playsInline ref={remoteVideo} autoPlay ></video>
                    <button onClick={endCall}>end call</button>
                </div>)
             :
            <div>
                <button onClick={makeCall(remoteId)}>call</button>
                <button onClick={answer}>answer</button>  
            </div>}
        </div>
    )
    
}

export default Video;