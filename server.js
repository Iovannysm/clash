const express = require("express");
const cors = require("cors");
const routes = require("./routes"); 

require("./config/db.connection");

const app = express();
const PORT = process.env.PORT;


app.use(cors());

app.use(express.json());


app.use("/api/v1/games",routes.games);
app.use("/api/v1/events",routes.events);
app.use("/api/v1/auth",routes.auth);
app.use("/api/v1/user",routes.user);



app.listen(PORT, function() {
  console.log(`Listening for client request on port ${PORT}`);
});


