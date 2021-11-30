import { Event } from '../models';

// Index
const index = function(req, res) {
  Event.find({}, function (error, foundEvents) {
    if (error) {
      console.log(error);
      return 
    }

    res.json({
      status: 200,
      message: "All Events Found",
      events: foundEvents,
      total: foundEvents.length,
      requestedAt: new Date(),
    });

  });
};

// Show
const show = function(req, res) {
  Event.findById(req.params.id, function (error, foundEvent) {
    if(error) {
      console.log(error);
      return
    }

    res.json({
      status: 302,
      message: `Found Event with id ${foundEvent._id}`,
      event: foundEvent,
      requestedAt: new Date(),
    });

  });
};

// Create
const create = function(req, res) {
  Event.create(req.body, function(error, createdEvent) {
    if(error) {
      console.log(error);
      return
    }

    res.json({
      status: 201,
      message: "Event Successfully Created",
      event: createdEvent,
      requestedAt: new Date(),
    });

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

      res.json({
        status: 200,
        message: `Successfully Updated Event with id ${updatedEvent._id}`,
        event: updatedEvent,
        requestedAt: new Date(),
      });

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

    res.json({
      status: 200,
      message: `Successfully deleted Event by id ${deletedEvent._id}`,
      event: deletedEvent,
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
