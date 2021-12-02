
import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
// import { props.socket } from "../util/props.socket";

function EditorShow(props) {

    // let props.socket = io("http://localhost:3500");
    // let props.socket = io();
    // let props.socket = props.socket;
    // props.socket.on("connect", () => {
    //     console.log("You have successfully connected");
    // })
    // window.onbeforeunload = (event) => {
    //     props.socket.close();
    // }
    const editorRef = useRef(null);
    const [body, setBody] = useState(props.document.body);

    // Code to receive event:
    let incomingTimeout;
    props.socket.on("editor-data", incomingData => {
        // console.log('Incoming: ',incomingData);
        if (editorRef.current) {

            if (incomingData.userId === props.userId) return;
            if (incomingData.body === editorRef.current.getValue()) return;
    
            if (incomingTimeout) clearTimeout(incomingTimeout);
            incomingTimeout = setTimeout(() => {
                if (incomingData.body !== body) {
                    setBody(incomingData.body);
                }
                }, 750);
        }
        
    })

    props.socket.on("user-connected", data => {
        // console.log('editor also gets user-connected');
        props.socket.emit("editor-data", { body: body, userId: props.userId, groupId: props.groupId });
        
    })

    function handleEditorDidMount(editor, monaco) {
        props.socket.emit("join-editor", {groupId: props.groupId})

        editorRef.current = editor;
    }

    useEffect(() => {

        if (editorRef.current) {

            if (editorRef.current.getValue() !== body) {
                const cursorPosition = editorRef.current.getPosition();
                // console.log('setting value at 10');
                
                editorRef.current.setValue(body);
                editorRef.current.setPosition(cursorPosition);
            }

            return () => {
            }
        }
    }, [body]);

    let outgoingTimeout;
    function handleEditorChange(value, e) {
        // console.log(`value: `, value);
        // console.log(`e: `, e);
        
        const data = editorRef.current.getValue();
        if (data === body) return;

        setBody(data);
        if (outgoingTimeout) clearTimeout(outgoingTimeout);
        outgoingTimeout = setTimeout(() => {
            // console.log('Outgoing:', body);
            props.socket.emit("editor-data", { body: body, userId: props.userId, groupId: props.groupId });
        }, 750);
    }

    function saveDocument() {
        props.updateDocument(props.document, body, props.groupId);
    }

    const options = {
        fontSize: "16px",
        letterSpacing: "1em"
    };

    function leaveGroup() {
        props.leaveGroup()
    }
    return (
        <div className="editor-container">
            <Editor
                className="editor"
                defaultLanguage="javascript"
                defaultValue={body}
                theme="vs-dark"
                options={options}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange} />
            <div className="save-btn-div">
                <button className="group-save-btn save-btn"
                    onClick={saveDocument}>Save</button>
                <button className="group-save-btn leave-btn"
                    onClick={leaveGroup}>
                    LEAVE GROUP
                </button>
            </div>
        </div>
    )
}

export default EditorShow;