
const { Game, Event } = require("../models"); 
const express = require("express");
const router = express.Router();



// Index
router.get("/",async function(req, res, next) {
  try {
    const allGames = await Game.find({}).populate("user").sort("-createdAt");
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
});

// Show
router.get("/:id" ,async function(req, res, next) {
  try {
    const game = await Game.findById(req.params.id).populate("user");
    const allEvents = await Event.find(
      {
        game: req.params.id,
      }
    )
    .populate("user")
    .sort("-createdAt");

    const context = {
      game: game,
      events: allEvents
    }

    return res.render("games/show", context);

  } catch(error) {
      console.log(error);
      req.error = error;
      next();
  }
});

// New
router.get("/new", function(req, res){
  res.render("games/new");
});


// Create
router.post("/", function(req, res, next) {
  const data = req.body;
  data.user = req.session.currentUser.id;

  Game.create(data, function(error, createdGame) {
    if(error) {
      console.log(error);
      req.error = error
      return next();
    }

    res.redirect("/games/new");

  });
});

// Edit
router.get("/:id/edit", function (req, res, next) {
  Game.findById(req.params.id, function (error, foundGames) {
    if (error) {
      console.log(error);
      req.error = error;
      return next();
    }

    const context = {
      product: foundGames,
    };

    res.render("games/edit", context);
  });
});

// Update 
router.put("/:id",function(req, res, next) {
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
});

// Delete 
router.delete("/:id",function(req, res, next) {
  Game.findByIdAndDelete(req.params.id, function(error, deletedGame) {
    if(error) {
        console.log(error);
        req.error = error
        return next();
    }

    res.redirect("/games");

  });
});

module.exports = router;
  
