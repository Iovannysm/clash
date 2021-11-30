import {Game} from '../models';


const index = function(req, res) {
  Game.find({}, function (error, foundGames) {
    if (error) {
      console.log(error);
      return 
    }

    res.json({
      status: 200,
      message: "All Games Found",
      games: foundGames,
      total: foundGames.length,
      requestedAt: new Date(),
    });

  });
};

const show = function(req, res) {
  Game.findById(req.params.id, function (error, foundGame) {
    if(error) {
      console.log(error);
      return
    }

    res.json({
      status: 302,
      message: `Found game with id ${foundGame._id}`,
      game: foundGame,
      requestedAt: new Date(),
    });

  });
};

const create = function(req, res) {
  Game.create(req.body, function(error, createdGame) {
    if(error) {
      console.log(error);
      return
    }

    res.json({
      status: 201,
      message: "Game Successfully Created",
      game: savedGame,
      requestedAt: new Date(),
    });

  });
};

const update = function(req, res) {
  Game.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function(error, updatedGame) {
      if(error) {
        console.log(error);
        return
      }

      res.json({
        status: 200,
        message: `Successfully Updated Game with id ${updatedGame._id}`,
        game: updatedGame,
        requestedAt: new Date(),
      });

    }
  );
};

const destroy = function(req, res) {
  Game.findByIdAndDelete(req.params.id, function(error, deletedGame) {
    if(error) {
      console.log(error);
      return
    }

    res.json({
      status: 200,
      message: `Successfully deleted Game by id ${deletedGame._id}`,
      game: deletedGame,
      requestedAt: new Date(),
    });

  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
