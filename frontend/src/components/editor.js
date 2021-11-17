import React from "react";
import io from "socket.io-client";
// import * as CodeMirror from "codemirror";
import { Controlled } from "react-codemirror2-react-17";
import * as monaco from "monaco-editor";

class Editor extends React.Component {
    // Pass URL of server to connect client to server:
    socket = io("http://localhost:3300");

    constructor(props) {
        super(props);
        // this.state = { body: this.props.document.body };
        this.state = { body: ["// Your code goes here...\n"].join('\n') };

        this.socket.on("connect", () => {
            console.log("You have successfully connected");
        })

        this.handleChange = this.handleChange.bind(this);
    }

    // update(field) {
    //     return event => {
    //         this.setState({ [field]: event.target.value }, () => {
    //             // Code to emit event:
    //             const data = this.state.body;
    //             this.socket.emit("editor-data", data);
    //         });
    //     }
    // }

    componentDidMount() {
        //     const textarea = document.querySelector(".editor-textarea");
        //     this.codeMirror = CodeMirror.fromTextArea(textarea);
        //     this.codeMirror.on("change", event => {
        //         const data = this.state.body;
        //         this.socket.emit("editor-data", data);
        //     })
        this.editor = monaco.editor.create(document.querySelector(".editor"), {
            value: this.state.body,
            language: "javascript",
            theme: "vs-dark",
            minimap: { enabled: false }
        });
        
        this.editor.getModel().onDidChangeContent(event => {
            this.handleChange();
        });
        
        // Code to receive event:
        this.socket.on("editor-data", data => {
            // const textarea = document.querySelector(".editor-textarea");
            // textarea.innerHTML = data;
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                if (data !== this.state.body) {
                    this.setState({ body: data, status: "RECEIVING" }, () => {
                        // const cursorPosition = this.editor.getPosition();
                        this.editor.getModel().setValue(data);
                        // this.editor.setPosition(cursorPosition);
                    })
                }
            }, 1000);
        })
    }

    handleChange() {
        const data = this.editor.getValue();
        if (data !== this.state.body) {
            this.setState({ body: data, status: "SENDING" }, () => {
                const data = this.state.body;
                this.socket.emit("editor-data", data);
            });
        }
    }

    render() {
        return (
            <div className="editor" style={{"width": "800px", "height": "600px", "border": "1px solid red"}}>
                {/* <textarea
                    className="editor-textarea"
                    onChange={this.update("body")}
                    value={this.state.body}
                    style={{ "backgroundColor": "white", "width": "300px", "height": "300px", "color": "black" }}></textarea> */}
            </div>
        )
    }
}

export default Editor;