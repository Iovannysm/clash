
const { Game, Event } = require("../models"); 

require("../middleware/navRequire");


// Index
const index = async function(req, res, next) {
  try {
    const allGames = await Game.find(query).populate("user").sort("-createdAt");
    const allEvents = await Event.find({games: req.params.id}).populate("user").sort("-createdAt");
    
    context = {
      games: allGames,
      events: allEvents,
    }

    return res.render("games/index", context);

  } catch(error) {
      console.log(error);
      req.error = error;
      next();
  }    
};

// Show
const show = async function(req, res, next) {
  try {
    const game = await Game.findById(req.params.id).populate("user");
    const allEvents = await Event.find(
      { $and: [
        {
          game: req.params.id,
        },
        query
      ]}
    )
    .populate("user")
    .sort("-createdAt");

    const context = {
      game: game,
      events: allEvents
    }

    return res.render("game/show", context);

  } catch(error) {
      console.log(error);
      req.error = error;
      next();
  }
};

// Create
const create = function(req, res, next) {
  const data = req.body;
  data.user = req.session.currentUser.id;

  Game.create(req.body, function(error, createdGame) {
    if(error) {
      console.log(error);
      req.error = error
      return next();
    }

    res.redirect("/games");

  });
};

// Update 
const update = function(req, res, next) {
  Game.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function(error, updatedGame) {
      if(error) {
        console.log(error);
        req.error = error
        return next();
      }

      res.redirect(`/games/${req.params.id}`);

    }
  );
};

// Delete 
const destroy = function(req, res, next) {
  Game.findByIdAndDelete(req.params.id, function(error, deletedGame) {
    if(error) {
        console.log(error);
        req.error = error
        return next();
    }

    res.redirect("/games");

  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
