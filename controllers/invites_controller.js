// const Group = require("../models/Group");

const Group = require("../models/Group");

const createInvite = (req, res) => {

  const newInvite = new Invite({
    invitee: req.headers.userId,
    inviter: req.user.id,
    group: req.headers.groupId
  })
  newInvite.save().then( (newInvite) => {
    res.json(newInvite);
  } )
}

const deleteInvite = (req, res) => {
  Invite.findbyId(req.params.inviteId, (err, invite) => {
    if (req.headers.response === true) {
      Group.findById(invite.group), (err, group) => {
        group.users.push(req.user.id)
      }
    }
  });
}



module.exports = {
  createInvite,
  deleteInvite,
}

