import express from "express";
import methodOverride from "method-override"


/* === System Variables === */
const app = express();
const PORT = 4000;

/* === System Configuration === */
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));



app.get("/*", function(res, req) {
  const context = {error: req.error};
  escape.render("404", context);
})


app.listen(PORT, function() {
  console.log(`Listening for client request on port ${PORT}`);
});


