const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    title: String,
    img: String,
    content: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
  },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;