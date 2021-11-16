// import React from "react";


// class Editor extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = { body: this.props.document.body };
//     }

//     update(field) {
//         return event => {
//             this.setState({ [field]: event.target.value });
//         }
//     }

//     componentDidMount() {
//         const textarea = document.querySelector(".editor-textarea");
//         this.codeMirror = CodeMirror.fromTextArea(textarea);
//         this.codeMirror.on("change", event => {

//         })

//     }

//     render() { //  onChange={this.update("body")}
//         return (
//             <section className="editor">
//                 <textarea className="editor-textarea"></textarea> 
//             </section>
//         )
//     }
// }

// export default Editor;