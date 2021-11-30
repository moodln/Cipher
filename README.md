# Cipher

[Live site!](https://cipher-mern.herokuapp.com/#/)

###  GOOGLE DOCS meets CODECADEMY meets ZOOM

### Table of Contents


# Background and Overview
Cipher was inspired by our desire for a coding environment in which you can practice the driver/navigator roles from a shared code editor and over video chat from the same application.
Have you ever been working with someone on a coding project, and noticed that your computer is running into overdrive?
Cipher is here to help you focus on your work without worrying about your computer crashing!
Cipher provides an environment for developers to collaborate with one another on coding projects, while video streaming.
Cipher will allow you to: 
  - organize your projects in one centralized sidebar
  - add colleagues to projects and give them the ability to annotate or edit your work
  - collaborate with colleagues/potential employees instantly with video streaming and automatic screen sharing


# Functionality & MVPs

1. User Authentication
2. Collaborative text area, where all users can contribute to the same document with live updates
    - Ability to save progress on document, and return to later (CRUD feature)
      - 'owner' has password for document and can share invites with other users
3. Provide practice problems - organized by language, or by topic (trees, recursion, etc.)
4. Ability to add friends and create groups (CRUD feature)
5. Live video stream


## Bonus Feature
6. Possible messaging feature: ratings, responses
7. Embedded IDE and ability to compile code



# Technologies & Technical Challenges
- MongoDB
- Express.js
- Node.js
- React
- Redux
- Axios
- Socket.io and Socket.io-client
- Monaco Editor API

#### Backend: MongoDB/Express and Websocket


#### Frontend: React/Node.js



# Group Members & Work Breakdown

#### Madeline Wilson (Backend), Rebecca Foster (Flex), Pasan Dharmasena (Frontend), Maria Vaghani (Team Lead)

### Day 1
  - Implement state shape and user auth (Maddie)
  - Create wireframe and work on splash page (Pasan)
  - Create basic routes (Rebecca)
      - (GET#api/documents/user/:user_id, GET#api/problems, GET#api/friends/user/:user_id)
  - Collect information on websockets and implement it (Maria)
### Day 2
  - Test deployment to Heroku (All)
  - Finish problems routes, implement videochat feature (Maddie)
  - Work on problems index page, go through all components and make sure colors match (Pasan)
  - Work on document show page (collaborative text area) (Rebecca)
    - auto-save flash message
  - Wrap up invites routes, work on Practice Problem containers and components (Maria)

### Day 3
  - Finish videochat feature (Maddie)
  - Monaco editor for document show page (Rebecca)
  - Work on sidebar and dashboard component (links to problems and documents, etc) (Pasan, Rebecca)
  - Work on navbar notifications for invites (Maria)

### Day 4
  - Complete production README (Maddie)
  - Refine CSS (Pasan, Rebecca)
  - Finish testing and debugging (Maria)
  - Heroku deployment (All)