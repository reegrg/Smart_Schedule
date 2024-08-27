const { mongoose } = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true,
    },
    date: {
        type: Date
    }
})

module.exports = mongoose.Schema('Schedule', scheduleSchema);