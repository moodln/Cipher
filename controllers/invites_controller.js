const Invite = require("../models/Invite");
const Group = require("../models/Group");

const createInvite = (req, res) => {
  
  Invite.findOne(
    {invitee: req.body.headers.inviteeId,
    inviter: req.user.id,
    group: req.body.headers.groupId},
    (err, invite) => {
      console.log(`invite: `, invite);
      
      if (invite) return res.json({error: "You have already invited them to this group"});
      
      const newInvite = new Invite({
        invitee: req.body.headers.inviteeId,
        inviter: req.user.id,
        group: req.body.headers.groupId
      })
      newInvite.save().then( (newInvite) => {
        
        res.json(newInvite);
      } )
    })

}

// ===============================================================================
// ===============================================================================

const deleteInvite = (req, res) => {
  console.log(`req.params.inviteId: `, req.params.inviteId);
  Invite.findById(req.params.inviteId, (err, invite) => {
    console.log(`req.headers: `, req.headers);
    
    if (req.headers.response === "true") {
      
      Group.findById(invite.group, (err, group) => {
        group.users.push(req.user.id)
        group.save();
        const groupsById = {};
        groupsById[group.id] = group
          
        const allGroupsId = Object.keys(groupsById);
        Invite.findByIdAndDelete(req.params.inviteId)
      .then( () => res.json({groupsById, allGroupsId}))

      })
    } else {
      Invite.findByIdAndDelete(req.params.inviteId)
      .then( () => res.json({success: true}))

    }
})

  
  .catch(err => console.log("error: ", err));
}


// ===============================================================================
// ===============================================================================

const getCurrUserInvites = (req, res) => {
  Invite.find({ invitee: req.user.id}, (err, invitesResult) => {
    const invitesById = {};
      
      invitesResult.forEach(invite => {
        
        invitesById[invite.id] = invite;
      });
      const allInvitesId = Object.keys(invitesById);

      const groupsToFetch = Object.values(invitesById).map((invite) => {
        return invite.group
      });
      Group.find({ "_id": { $in: groupsToFetch} }, (err, groupsResult) => {
        const groupsById = {};
      
        groupsResult.forEach(group => {
          
          groupsById[group.id] = group;
        });
        const allGroupsId = Object.keys(groupsById);
        
        return res.json({invitesById, allInvitesId, groupsById, allGroupsId})
      })
  });
}


// ===============================================================================
// ===============================================================================

const getCurrUserOutcomingInvites = (req, res) => {
  // console.log(`res: `, res);
  Invite.find({ inviter: req.user.id}, (err, invites) => {
    return res.json(invites)
  });
}



module.exports = {
  createInvite,
  deleteInvite,
  getCurrUserInvites,
  getCurrUserOutcomingInvites
}

