const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name needs to be provided."],
    },
    // image: {
    //   type: String,
    //   required: [true, "Image needs to be provided."],
    // },
    content: {
      type: String,
      required: [true, "Description needs to be provided."],
    },
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