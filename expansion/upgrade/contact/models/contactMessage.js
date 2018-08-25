const mongoose = require("mongoose");
const moment = require("moment");
/* Conatct Message Schema */
const contactMessageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  submitted:{
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
  },
  content: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}); /* end of contact message schema */
/* start of contact message functions */

/* end of contact message functions */
module.exports = mongoose.model("ContactMessage", contactMessageSchema);