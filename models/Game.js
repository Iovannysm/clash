import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    title: String,
    img: String,
    content: String
  }
);

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;