
const routes = [
  {
      href: "/games",
      title: "Games",
  },
  {
      href: "/events",
      title: "Events",
  },
  {
      href: "/user",
      title:"Account",

  },
  {
    href: "logout",
    title: "Logout"
  }
];

const authRoutes = [
  {
      href: "/login",
      title: "Login",
  },
  {
      href: "/register",
      title: "Register",
  },
 
];

module.exports = function navLinks(req, res, next) {
  if (req.session.currentUser) {
    res.locals.routes = routes;
    res.locals.user = req.session.currentUser;
  } else {
    res.locals.routes = authRoutes;
  }

  next();
};
