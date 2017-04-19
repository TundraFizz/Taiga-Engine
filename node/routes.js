var app = require("../server.js");

// This is the main page users go to when they visit your website
app.get("/", function(req, res){
  res.render("index.ejs");
});

// If a user goes to any other page
app.use(function (req, res){
  res.render("404.ejs");
});
