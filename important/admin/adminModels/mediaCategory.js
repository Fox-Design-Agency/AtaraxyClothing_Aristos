const mongoose = require("mongoose")

/* Media Category Schema */
const MediaCategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String
    }
})

module.exports = mongoose.model("MediaCategory", MediaCategorySchema);