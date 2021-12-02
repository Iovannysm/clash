const { Event } = require("../models");
const Game = require("../models/Game");

// Index
const index = async function(req, res, next) {
  try {
    const allEvents = await Event.find(query).populate("user").sort("-createdAt");
    const allGames = await Game.find({events: req.params.id}).populate("user").sort("-createdAt");

    context = {
      events: allEvents,
      games: allGames
    }

    return res.render("events/index", context);

  } catch(error) {
      console.log(error);
      req.error = error;
      next();
  }
};

// Show
const show = async function(req, res) {
  try {
    const event = await Event.findById(req.params.id).populate("user");
    const game = await Game.findById(req.params.id).populate("user");

    const context = {
      event: event,
      game: game
    }

    return res.render("event/show", context);

  } catch(error) {
      console.log(error);
      req.error = error;
      next();
  }
};

// Create
const create = function(req, res) {
  const data = req.body;
  data.user = req.session.currentUser.id;

  Event.create(req.body, function( error, createdEvent){
    if(error) {
      console.log(error);
      req.error = error
      return next();
    }

    res.redirect("/events");
  });
};

// Update 
const update = function(req, res) {
  Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function(error, updatedEvent) {
      if(error) {
        console.log(error);
        return
      }

      res.redirect(`/event/${req.params.id}`);

    }
  );
};

// Delete 
const destroy = function(req, res) {
  Event.findByIdAndDelete(req.params.id, function(error, deletedEvent) {
    if(error) {
      console.log(error);
      return
    }

    res.redirect("/events");

  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
