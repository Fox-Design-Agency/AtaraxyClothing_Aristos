const mongoose = require("mongoose");

/* Note Schema */
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  assigned: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  published: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Date
  },
  content: {
    type: String,
    required: true
  }
}); /* end of note schema */

module.exports = mongoose.model("Note", NoteSchema);
