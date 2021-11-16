const Group = require("../models/Group");
const Problem = require("../models/Problem");

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
  // console.log(`res: `, res);
  Group.find({ users: req.user.id}, (err, groups) => {
    console.log(`groups: `, groups);
    return res.json(groups)
  });
}

const retrieveGroup = (req, res) => {
  console.log(`req: `, req);
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