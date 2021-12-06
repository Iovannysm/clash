/* === External Modules === */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");



// Security modules
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");


/* === Internal Modules === */
const controller = require("./controllers")
require("./config/db.connection");

/* === System Variables === */
const app = express();
const PORT = process.env.PORT;


/* === System Configuration === */

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

//Session config to create cookies
app.use(session({
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // two days
  }
}));

/* === Middleware === */



app.use(mongoSanitize());

app.use(morgan("dev"));

app.use(rateLimit({
  windowMS: 1000 * 60 * 60,
  max: 1000,
  message: "Please try again later or contact the system admin for more requests.",
}));

app.use(hpp());

app.use(require("./utils/navLinks"));

// Home

app.get('/', function(req, res) {
  res.render("index");
})


app.use("/games", controller.games);
app.use("/events", require("./middleware/authRequired"), controller.events);
app.use("/", controller.auth);
app.use("/user", controller.user);

app.get("/*", function (req, res) {
  const context = { error: req.error };
  res.render("404", context);
});

app.listen(PORT, function() {
  console.log(`Listening for client request on port ${PORT}`);
});


