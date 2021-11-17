const Group = require("../models/Group");
const Problem = require("../models/Problem");
const User = require("../models/User");

const createGroup = (req, res) => {

  Problem.findById(req.headers.problemid, (err, reqProblem) => {
    
    const newDocument = new Document({
      body: "hey-hey",
      problem: reqProblem.id,
    })
    newDocument.save()
    .then( (newDocument) => {
      
      const newGroup = new Group({
        document: newDocument,
        users: [req.user.id],
      })
      newGroup.save()
      .then( (newGroup) => {
        
        return res.json(newGroup);;
      })
    })
  })
}

const getCurrUserGroups = (req, res) => {
  let allUsersId = [];
  const usersById = {};

  
  Group.find({ users: [req.user.id]}, (err, groups) => {
    if (err) throw err;
    const groupsById = {};

    Object.values(groups).forEach(group => {
      groupsById[group.id] = group;
      allUsersId = allUsersId.concat(group.users);
    });

    const allGroupsId = Object.values(groups).map((group) => {
      return group.id
    });
    
    
    User.find({ "_id": { $in: allUsersId} }, (err, usersResult) => {
      if (err) throw err;
      usersResult.forEach(user => {
        
        usersById[user.id] = user;
      });
      res.json({groupsById, allGroupsId, allUsersId, usersById})
    })
  })
  .catch(err => console.log("errors: ", err));
}

const retrieveGroup = (req, res) => {
  Group.findById(req.params.groupId, (err, group) => {
    if (group.users.includes(req.user.id)) {
      return res.json(group)
    } else {
      return res.status(400).json({error: "You do not have access to this group"})
    }
  });
}


module.exports = {
  createGroup,
  getCurrUserGroups,
  retrieveGroup
}