const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    
    content: String,
    
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require
    },
    attendees: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;