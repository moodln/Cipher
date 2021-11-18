const Group = require("../models/Group");
const Problem = require("../models/Problem");
const User = require("../models/User");
const Invite = require("../models/Invite");

const createGroup = (req, res) => {
  
  Problem.findById(req.body.headers.problemId, (err, reqProblem) => {
    
    const newDocument = new Document({
      body: "hey-hey",
      problem: reqProblem.id,
    })
    newDocument.save()
    .then( (newDocument) => {
      
      const newGroup = new Group({
        document: newDocument,
        users: [req.user.id],
        title: `${reqProblem.title} by ${req.user.handle}`
      })
      newGroup.save()
      .then( (newGroup) => {
        
        return res.json(newGroup);;
      })
    })
  })
}

// "==============================================================================="
// "==============================================================================="

const getCurrUserGroups = (req, res) => {
  let allUsersId = [];
  const usersById = {};

  
  Group.find({ users: req.user.id}, (err, groups) => {
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

// "==============================================================================="
// "==============================================================================="

const retrieveGroup = (req, res) => {
  const usersById = {};

  Group.findById(req.params.groupId, (err, groupsById) => {
    
    const allGroupsId = [groupsById._id];
    if (groupsById.users.includes(req.user.id)) {
      
      Problem.findById(groupsById.document.problem, (err, problem) => {
        const problemsById =  problem;
        let allProblemsId = [problem._id];
        
        Invite.find({group: groupsById.id}, (err, invitesResult) => {
          const invitesById = {};
          
          invitesResult.forEach(invite => {
            
            invitesById[invite.id] = invite;
          });
          const allInvitesId = Object.keys(invitesById);

          const invitedUsersToFetch = Object.values(invitesById).map((invite) => {
            return invite.invitee
          });
          
          User.find({ "_id": { $in: groupsById.users.concat(invitedUsersToFetch)} }, (err, usersResult) => {
            usersResult.forEach(user => {
          
              usersById[user.id] = user;
            });
            const allUsersId = Object.keys(usersById)
          
            
            return res.json({groupsById, allGroupsId, problemsById, allProblemsId, usersById, allUsersId, invitesById, allInvitesId})
          })
        })
      })
    } else {
      return res.status(400).json({error: "You do not have access to this group"})
    }
  });
}

// "==============================================================================="
// "==============================================================================="

const removeUserFromGroup = (req, res) => {
  Group.findById(req.params.groupId, (err, groupResult) => {
    const index = groupResult.users.indexOf(req.user.id);
    if (index > -1) {
      groupResult.users.splice(index, 1);
    }
    
    groupResult.save();
    if (groupResult.users.length === 0) {
      Invite.deleteMany({group: req.params.groupId}, (err, result) => {
        Group.deleteOne({_id: req.params.groupId}, (err, result) => {
          res.json({deletedGroup: req.params.groupId})
        })
      })
    } else {
      console.log(`groupResult right before sending to frontend: `, groupResult);
      res.json({groupResult});
    }
  })
}


module.exports = {
  createGroup,
  getCurrUserGroups,
  retrieveGroup,
  removeUserFromGroup
}