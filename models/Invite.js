const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
  invitee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  inviter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Invite = mongoose.model('invite', InviteSchema);
