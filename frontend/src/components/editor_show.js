
import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

function EditorShow(props) {
    const editorRef = useRef(null);
    const [body, setBody] = useState(props.document.body);

    props.socket.on("user-connected", data => {
        props.socket.emit("editor-data", { body: body, userId: props.userId, groupId: props.groupId });

    })

    // Code to receive event:
    let incomingTimeout;
    props.socket.on("editor-data", incomingData => {
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

    function handleEditorDidMount(editor, monaco) {
        monaco.editor.defineTheme("myTheme", {
            base: "vs-dark",
            inherit: true,
            rules: [{ background: "0E1525" }],
            colors: {
                "editor.background": "#0E1525",
                "editor.lineHighlightBackground": "#0000FF20",
                "editorLineNumber.activeForeground": "#FFFFFF",
                "editor.selectionBackground": "#BFFE7B10",
                "editor.inactiveSelectionBackground": "#FFFFFF"
            }
        });
        monaco.editor.setTheme("myTheme");
        editorRef.current = editor;
        props.socket.emit("join-editor", { groupId: props.groupId });
    }

    useEffect(() => {
        window.addEventListener("beforeunload", saveDocument);
     // componentDidMount events
     return () => {
       // componentWillUnmount events
        saveDocument()
        window.removeEventListener("beforeunload", saveDocument);
     }
   }, []);

    useEffect(() => {

        if (editorRef.current) {
            if (editorRef.current.getValue() !== body) {
                const cursorPosition = editorRef.current.getPosition();
                editorRef.current.setValue(body);
                editorRef.current.setPosition(cursorPosition);
            }
        }
    }, [body]);


    let outgoingTimeout;
    function handleEditorChange(value, e) {
        const data = editorRef.current.getValue();
        if (data === body) return;

        setBody(data);
        if (outgoingTimeout) clearTimeout(outgoingTimeout);
        outgoingTimeout = setTimeout(() => {
            props.socket.emit(
                "editor-data", {
                body: editorRef.current.getValue(),
                userId: props.userId,
                groupId: props.groupId
            });
        }, 750);
    }

    function saveDocument() {
        if (editorRef.current) {
            props.updateDocument(props.document, editorRef.current.getValue(), props.groupId);
        }
    }

    function leaveGroup() {
        props.leaveGroup();
    }

    const options = {
        fontSize: "16px",
        letterSpacing: "1em",
        lineDecorationsWidth: "0px",
        minimap: {
            enabled: true,
            scale: 1,
            size: "actual"
        },
        padding: {
            top: '10px',
            bottom: '10px'
        },
        revealHorizontalRightPadding: "20px",
        showUnused: true,
        wordWrap: "wordWrapColumn",
        wordWrapColumn: '100'
    };

    return (
        <div className="editor-container">
            <Editor className="editor"
                defaultLanguage="javascript"
                defaultValue={body}
                theme="hc-black"
                options={options}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange} />
            <div className="save-btn-div">
                <button className="group-save-btn save-btn"
                    onClick={saveDocument}>Save</button>
                <button className="group-save-btn leave-btn"
                    onClick={leaveGroup}>Exit Group</button>
            </div>
        </div>
    )
}

export default EditorShow;