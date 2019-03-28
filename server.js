const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  // console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log(err);
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render("maintenance.hbs",{
//     pageTitle: "Maintenance",
//     maintenanceMessage: "Site is under maintenance, we'll be right back!"
//   });
// });

app.use(express.static(__dirname + "/public"));
hbs.registerHelper("getCurrentYear",() => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt",(text) => {
  return text.toUpperCase();
});

app.get("/",(req, res) => {
  res.render("home.hbs",{
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to your life"
  });
});

app.get('/about',(req,res) => {
  res.render("about.hbs",{
    pageTitle: "About"
  });
});


app.get('/bad',(req,res) => {
  res.send({
    errorMessage: "Unable to handle the request"
  });
});

app.listen(3000, () => {
  console.log(`Server is up and running on port ${port}`);
});
