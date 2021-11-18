import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";

function EditorShow() {
    const socket = io("http://localhost:3300");
    socket.on("connect", () => {
        // console.log("You have successfully connected");
    })

    const editorRef = useRef(null);
    const [body, setBody] = useState("// Your code goes here...\n");

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
        </div>
    );
}

export default EditorShow;