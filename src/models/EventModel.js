const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
    startTime: {
      type: Date, // Store as a string in "HH:mm" format
      required: true
    },
    endTime: {
      type: Date, // Store as a string in "HH:mm" format
      required: true
    }
  });
  


const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
