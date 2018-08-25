const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
/* Note Schema */
const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  assigned: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  published: {
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
  },
  completed: {
    type: String
  },
  content: {
    type: String,
    required: true
  }
}); /* end of note schema */

module.exports = mongoose.model("Note", NoteSchema);
