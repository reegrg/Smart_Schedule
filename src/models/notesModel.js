const { default: mongoose } = require("mongoose");


const notesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxLength: 1000,
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
         type: Date, 
         default: Date.now
    },
    favorite: {
        type: Boolean,
        default: false
    }

})

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;