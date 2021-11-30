import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    title: String,
    img: String,
    content: String
  }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;