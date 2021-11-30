import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";

function EditorShow(props) {
    const socket = io("http://localhost:3300");
    // socket.on("connect", () => {
    //     console.log("You have successfully connected");
    // })

    const editorRef = useRef(null);
    const [body, setBody] = useState(props.document.body);

    // Code to receive event:
    let incomingTimeout;
    socket.on("editor-data", incomingData => {
        console.log(`Incoming: ${incomingData.body}`);

        if (incomingData.userId === props.userId) return;
        if (incomingData.body === editorRef.current.getValue()) return;

        if (incomingTimeout) clearTimeout(incomingTimeout);
        incomingTimeout = setTimeout(() => {
            if (incomingData.body !== body) {
                setBody(incomingData.body);
            }
        }, 750);
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

            return () => {
            }
        }
    }, [body, socket, editorRef]);

    let outgoingTimeout;
    function handleEditorChange() {
        const data = editorRef.current.getValue();
        if (data === body) return;

        setBody(data);
        if (outgoingTimeout) clearTimeout(outgoingTimeout);
        outgoingTimeout = setTimeout(() => {
            console.log(`Outgoing: ${body}`);
            socket.emit("editor-data", { body: data, userId: props.userId, groupId: props.groupId });
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