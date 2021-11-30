# Cipher
# ![Screen Shot 2021-11-30 at 9 37 25 AM](https://user-images.githubusercontent.com/88195745/144111561-57ebc1ba-1a5d-4eb3-a2c2-0a8c92dce455.png)
<img src="https://user-images.githubusercontent.com/88195745/144111561-57ebc1ba-1a5d-4eb3-a2c2-0a8c92dce455.png" width="300" height="auto">

[Live site!](https://cipher-mern.herokuapp.com/#/)

### Table of Contents
- [Overview](#overview)
- [Technologies](#technologies)
- [Core Features & Technical Challenges](#core-features-and-technical-challenges)
- [Future Directions](#future-directions)

# Overview
Cipher is a MERN stack web application where developers can collaborate with one another on coding projects over video chat. It was inspired by our desire to practice the driver/navigator roles from a shared code editing environment while viewing the faces of the people we're collaborating with.

Cipher provides a selection of more than 60 practice problems. Clicking on a problem automatically creates and opens an empty code document, where users can begin writing JavaScript code from within the Monaco Editor while sharing their video with other developers in the work group. Invitations to join others' work groups appear in the navigation bar. Navigating to the dashboard allows the user to view all of the work groups to which they belong.

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
1. User Authentication
    - Users can Sign Up, Log In with a preexisting account, or click "Demo User" to easily explore the site.
2. Wide Selection of Pracice Problems
    - The database is populated with 60+ practice problems to choose from, all of which are visible from the problem index page that the user enters upon logging in.
    - Users can open the sidebar and type in the search to filter for problems that match their query.
3. Collaborative Editor (CRUD)
    - Users can contribute to the same document with live updates.
    - Clicking the "Save" button will save the user's current progress on the practice problem into the database to be retrieved later.
4. Work Groups (CRUD)
    - After opening a particular problem, users can click "Invite a Collaborator" to search for other developers to invite to the work group.
    - When a user hovers over the notifications icon in the navigation bar, all invite requests sent by other developers are fetched from the database and displayed beside "Accept" and "Reject" buttons.
5. Live Video Stream
    - Upon entering a particular problem either from the problem index or the user's dashboard, the user will begin sharing their video with any other developers in the work group.
    - Users can toggle their video on and off with ease.

## Future Directions
6. Possible messaging feature: ratings, responses
7. Embedded IDE and ability to compile code

# Authors
- Madeline Wilson
- Rebecca Foster
- Maria Vaghani
- Pasan Dharmasena
