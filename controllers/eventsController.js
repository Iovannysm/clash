const express = require("express");
const router = express.Router();
const { Event, Game } = require("../models");


// Help
router.get("/help", function (req, res) {
  res.send("help");
});

// Index
router.get( "/",async function(req, res, next) {
  try {
    const allEvents = await Event.find({}).populate("user").sort("-createdAt");
    const allGames = await Game.find({events: req.params.id}).populate("user").sort("-createdAt");

    context = {
      events: allEvents,
      games: allGames
    }

    console.log("hitting route")

    return res.render("events/index", context);

  } catch(error) {
      console.log(error);
      req.error = error;
      next();
  }
});

// Show
router.get("/:id", async function(req, res) {
  try {
    const event = await Event.findById(req.params.id).populate("user game");
    
    const context = {
      event: event
    }

    return res.render("events/show", context);

  } catch(error) {
      console.log(error);
      req.error = error;
      next();
  }
});

// New
router.get("/new", function(req, res){
  res.render("events/new");
});

// Create
router.post("/", function(req, res) {
  const data = req.body;
  data.user = req.session.currentUser.id;

  Event.create(req.body, function( error, createdEvent){
    if(error) {
      console.log(error);
      req.error = error
      return next();
    }

    res.redirect(`/events/${data.event}`);
  });
});

// Edit
router.get("/:id/edit", function (req, res, next) {
  Event.findById(req.params.id, function (error, foundEvent) {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

    const context = {
      product: foundEvent,
    };

    res.render("events/edit", context);
  });
});



// Update 
router.put("/:id",function(req, res, next) {
  Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function(error, updatedEvent) {
      if(error) {
        console.log(error);
        req.error = error 
        return next()
      }

      res.redirect(`/event/${req.params.id}`);

    }
  );
});

// Delete 
router.delete("/:id", function(req, res) {
  Event.findByIdAndDelete(req.params.id, function(error, deletedEvent) {
    if(error) {
      console.log(error);
      return
    }

    res.redirect("/events");

  });
});

module.exports = router;
