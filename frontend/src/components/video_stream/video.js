import React, { useEffect, useRef, useState} from 'react';
// use to copy Id
import { CopyToClipboard } from 'react-copy-to-clipboard';
// peer to peer connection

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3300')


function Video() {
    const  Peer = require('simple-peer');
    const [ myId, setMyId ] = useState('')
    const [ stream, setStream ] = useState()
    const [ receivingCall, setReceivingCall ] = useState(false)
    const [ caller, setCaller ] = useState('')
    const [ callerSignal, setCallerSignal ] = useState()
    const [ callAccepted, setCallAccepted ] = useState(false)
    const [ idToCall, setIdToCall ] = useState('')
    const [ callEnded, setCallEnded ] = useState(false)
    const [ name, setName ] = useState('')

    // reference video
    const myVideo = useRef()
    const oppositeVideo = useRef()
    // disconnect when call ends
    const connectionRef = useRef()

    // set everything on initial load
    useEffect(() => {
        // will ask for permission to use webcam
        navigator.mediaDevices.getUserMedia({ video: true, audio: true})
            .then(stream => {
                setStream(stream)
                // set reference to video to stream coming in from webcam
                myVideo.current.srcObject = stream
            })

            socket.on('me', (id) => {
                // grab id from backend and set it to frontend id
                setMyId(id)
            })

            socket.on('callUser', (data) => {
                setReceivingCall(true)
                setCaller(data.from)
                setName(data.name)
                setCallerSignal(data.signal)
            })
    }, [])

    // create a new peer
    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false, 
            stream: stream
        })

        peer.on('signal', (data) => {
            socket.emit('callUser', {
                userToCall: id, 
                signalData: data, 
                from: myId,
                name: name
            })
        })

        peer.on('stream', (stream) => {
            oppositeVideo.current.srcObject = stream 
        })

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false, 
            trickle: false, 
            stream: stream
        })

        peer.on('signal', (data) => {
            socket.emit('answerCall', {signal: data, to: caller})
        })

        peer.on('stream', (stream) => {
            oppositeVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)

        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
    }

    return (
        <div className='video-container'>
            <div className='video' >
                {/* terniary for return statement */}
                {stream && <video playsInline muted ref={myVideo} autoPlay  style={{width: '300px', zIndex: 2}}/>}
            </div>
            <div>
                {callAccepted && !callEnded ? 
                <video playsInline ref={oppositeVideo} autoPlay/> : null }
            </div>
            <input type="text" 
                value={name} 
                onChange={e => setName(e.currentTarget.value)} />
            <input type="text" 
                value={idToCall} 
                style={{background: 'white'}}
                onChange={e => setIdToCall(e.currentTarget.value)} />
            <CopyToClipboard text={myId}>
                    <button>copyId</button>
            </CopyToClipboard>
            <div>
                {callAccepted && !callEnded ? (
                    <button onClick={leaveCall}>end call</button>
                ) : (
                    <button onClick={() => callUser(idToCall)}>call</button>
                )}
                {idToCall}
            </div>
            <div>
                {receivingCall && !callAccepted ? (
                    <div>
                        <h1>{name} is calling...</h1>
                        <button onClick={answerCall}>answer</button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Video;