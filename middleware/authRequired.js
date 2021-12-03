const { navRoutes, navAuthRoutes } = require("../utils/navLinks");
const { User } = require("../models");

module.exports = async function authRequired(req, res, next) {
  if (req.session.currentUser) {
    res.locals.routes = navRoutes;
      res.locals.user = await User.findById(req.session.currentUser.id);
    } else {
      res.locals.routes = navAuthRoutes;
    }
  
    return next();
}

