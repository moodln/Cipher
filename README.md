# <img src="https://user-images.githubusercontent.com/88195745/144111561-57ebc1ba-1a5d-4eb3-a2c2-0a8c92dce455.png" width="275" height="auto">

<a href="https://cipher-mern.herokuapp.com/#/">Live site!</a>

### Table of Contents
- [Overview](#overview)
- [Technologies](#technologies)
- [Core Features & Technical Challenges](#core-features-and-technical-challenges)
- [Future Directions](#future-directions)

# Overview
Cipher is a MERN stack web application where developers can collaborate with one another on coding projects over video chat. It was inspired by our desire to practice the driver/navigator roles from a shared code editing environment while viewing the faces of the people we're collaborating with.

Cipher provides a selection of 60+ practice problems. Clicking on a problem automatically creates and opens an empty code document, where users can begin writing JavaScript code from within the Monaco Editor while sharing their video with other developers in the work group. Invitations to join others' work groups appear in the navigation bar. Navigating to the dashboard allows the user to view all of the work groups to which they belong.

# Technologies
- MongoDB
- Express
- Node
- Axios
- React/Redux
- Socket.io and Socket.io-client
- PeerJS
- Monaco Editor API

Cipher's frontend uses the React framework and Redux architecture for complex user interfaces. The application tier is comprised of an Express server-side framework situated within a Node JavaScript server to handle URL routing. The Axios JavaScript library is used to easily perform HTTP requests from the browser and Node runtime environment. Finally, MongoDB comprises the NoSQL database tier for scalability and flexibility.

WebSockets were implemented using Socket.io and Socket.io-client, with PeerJS providing peer-to-peer media streams and the Monaco Editor API providing a code editing environment.

# Core Features and Technical Challenges

## Collaborative Code Editor and Video Chat
Multiple users within the same work group can edit the code document and receive each other's updates in a matter of seconds. Clicking the "Save" button will save the user's current progress into the database to be retrieved later. While working on a problem, users can share their video with other developers in the work group and toggle their video and audio on and off with ease.

**CHALLENGE:** Since multiple components relied on the use of WebSockets, we initially created instances of the socket for each one. When opening a problem to begin coding, the `VideoStream` component was the first to create the socket instance and establish the media stream connection between users. Subsequently, the `EditorShow` component created a new instance of the socket, which caused an endless cycle of errors to be thrown in the console. Updates to the code document would be sent out over the socket connection but would reach their destination out of order and more than a couple minutes later.

**SOLUTION:** We ensured that only one socket instance was defined by creating a dedicated file to establish the socket connection (`export const socket = io();`) and importing that instance into both the `VideoStream` and `EditorShow` components.

**CHALLENGE:** Futhermore, any time the content of the code editor or media stream was emitted over the socket, all users connected to the server would receive the data rather than only the users in that particular work group.

**SOLUTION:** We added `groupId` and `userId` key-value pairs to the data object sent out over the socket. We also created socket events for `join-editor` and `join-room` based on the `groupId`, ensuring that the data was broadcast only to users within the work group from which the data originated. We used the `userId` to specify the id of the user from which the data originated. When any user within the work group received the data object over the socket, we matched the incoming `userId` against the current user's id. If they were a match, the incoming data could be ignored since that meant that the user receiving the data was also the user that sent the data.

```javascript
io.on("connection", socket => {
    socket.on("join-editor", data => {
        console.log('joining group editor');
        socket.join(data.groupId);
    })

    socket.on("editor-data", data => {
        socket.broadcast.to(data.groupId).emit("editor-data", data);
    })

    socket.on("join-room", data => {
        socket.join(data.groupId);
        socket.broadcast.to(data.groupId).emit("user-connected", data);
    });

    socket.on("user-disconnected", data => {
        socket.broadcast.to(data.groupId).emit("user-disconnected", data);
        socket.leave(data.groupId);
    })
});
```

```javascript
socket.on("editor-data", incomingData => {
    if (incomingData.userId === props.userId) return;
    if (incomingData.body === editorRef.current.getValue()) return;

    if (incomingTimeout) clearTimeout(incomingTimeout);
    incomingTimeout = setTimeout(() => {
        if (incomingData.body !== body) {
            setBody(incomingData.body);
        }
    }, 750);
})
```

## Work Groups
After opening a particular problem, users can click "Invite a Collaborator" to search for other developers to invite to the work group. When a user hovers over the notifications icon in the navigation bar, all invite requests sent by other developers are fetched from the database and displayed beside the "Accept" and "Reject" buttons.

<img src="https://user-images.githubusercontent.com/88195745/144267371-184d69ce-66c3-4b0e-a3b4-8f42cec869af.gif" float="left" height="350px" width="auto" />
<img src="https://user-images.githubusercontent.com/88195745/144300244-d278b8dd-c371-422f-b570-47acb583a9d0.png" float="right" width="350px" height="auto" />

## Future Directions
- Messaging feature for work groups
- Ability to post and rate solutions to problems

# Authors
- Madeline Wilson
- Rebecca Foster
- Maria Vaghani
- Pasan Dharmasena
