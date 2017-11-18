var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// var logger = function(req, res, next){
//   console.log("Logging: ");
//   next();
// }
//
// app.use(logger);

//EJS View engine Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

var users = [
  {
    id: "1",
    firstname: "Gustav",
    lastname: "Palm",
    email: "lol@lol.se",
  },
  {
    id: "2",
    firstname: "Phili",
    lastname: "Sams",
    email: "samss@lol.se",
  },
  {
    id: "3",
    firstname: "Joseph",
    lastname: "Cunt",
    email: "cunt@lol.se",
  }
]

app.get('/', function(request, response){

  response.render('index', {
    title: 'Customers',
    users: users
  });
});

app.post('/users/add', function(req, res){
  var newUser = {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
  }
  console.log(newUser);
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
