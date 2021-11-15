const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  problem: {
    type: Schema.Types.ObjectId,
    ref: 'Problem'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Document = mongoose.model('document', DocumentSchema);
