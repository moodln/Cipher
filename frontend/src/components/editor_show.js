import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";

function EditorShow(props) {
    const socket = io("http://localhost:3300");
    socket.on("connect", () => {
        // console.log("You have successfully connected");
    })

    const editorRef = useRef(null);
    // const [body, setBody] = useState("// Your code goes here...\n");
    const [body, setBody] = useState(props.document.body);

    // Code to receive event:
    let timeout;
    socket.on("editor-data", incomingData => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (incomingData !== body) {
                setBody(incomingData);
            }
        }, 750);
    })

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        // const initialVal = props.document.body;
        
    }

    useEffect(() => {
        if (editorRef.current) {
            if (editorRef.current.getValue() !== body) {
                const cursorPosition = editorRef.current.getPosition();
                editorRef.current.setValue(body);
                editorRef.current.setPosition(cursorPosition);
            }
            socket.emit("editor-data", body);
        }
    }, [body, socket, editorRef]);

    function handleEditorChange() {
        const data = editorRef.current.getValue();
        if (data !== body) {
            setBody(data);
            
        }
    }

    function saveDocument () {
        console.log('saving');
        console.log(`props.document: `, props.document);
        console.log(`body: `, body);
        props.updateDocument(props.document, body, props.groupId)
    }

    const options = {
        fontSize: "16px",
        letterSpacing: "1em"
    }

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
                onClick={saveDocument}
                >
                    Save
                </button>
            </div>
            
        </div>
    );
}

export default EditorShow;