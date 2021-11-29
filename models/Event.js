import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    // user: user._id,
    // game: game._id,
    content: String,
    date: Date,
    attendees: [user._id],
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;