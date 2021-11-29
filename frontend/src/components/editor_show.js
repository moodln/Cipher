import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";

function EditorShow(props) {
    
    let socket = io();
    // socket.on("connect", () => {
    //     console.log("You have successfully connected");
    // })
    window.onbeforeunload = (event) => {
        socket.close();
    }

    const editorRef = useRef(null);
    const [body, setBody] = useState(props.document.body);

    // Code to receive event:
    let timeout;
    socket.on("editor-data", incomingData => {
        if(incomingData.userId !== props.userId) {
            console.log(`incomingData: `, incomingData);
            
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                
                if (incomingData.body !== body ) {
                    // console.log(`incomingData.body: `, incomingData.body);
                    // console.log(`body: `, body);
                    
                    setBody(incomingData.body);
                }
            }, 750);
        }
    })

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;        
    }

    useEffect(() => {
        
        if (editorRef.current) {
            
            if (editorRef.current.getValue() !== body) {
                const cursorPosition = editorRef.current.getPosition();
                editorRef.current.setValue(body);
                editorRef.current.setPosition(cursorPosition);
            }
            console.log('going to EMIT body: ', body);
            socket.emit("editor-data", {body, userId: props.userId, groupId: props.groupId});
        }
    }, [body, socket, editorRef]);

    function handleEditorChange(e) {
        // setBody(e);
        const data = editorRef.current.getValue();
        // console.log(`data in handle change: `, data);
        // console.log(`body: `, body);
        
        if (data !== body) {
            setBody(data);
            // console.log('going to EMIT body: ', body);

            // socket.emit("editor-data", {body, userId: props.userId, groupId: props.groupId});

            
        }
    }

    function saveDocument () {
        props.updateDocument(props.document, body, props.groupId);
    }

    const options = {
        fontSize: "16px",
        letterSpacing: "1em"
    };

    return (
        <div className="editor-container">
            <Editor
                className="editor"
                defaultLanguage="javascript"
                defaultValue={body}
                // theme="vs-dark"
                options={options}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange} />
            <div className="save-btn-div">
                <button className="group-save-btn save-btn"
                    onClick={saveDocument}>Save</button>
            </div>
        </div>
    )
}

export default EditorShow;