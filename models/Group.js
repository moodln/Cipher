const mongoose = require('mongoose');
const Document = require('./Document');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  document: Document.schema,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model('group', GroupSchema);
