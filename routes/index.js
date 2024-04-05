
const express = require('express');
const router = express.Router();
const UserModel = require('./users');
const uuid = require('uuid');
const passport = require('passport');

// //^ with these below two lines user gets Login
// Passport local strategy setup
const localStrategy = require('passport-local');
passport.use(new localStrategy(UserModel.authenticate()));

// Route to render the index page
router.get('/', function (req, res, next) {
  res.render('index');
});

// Route to render the registration form
router.get('/register', function (req, res, next) {
  res.render('register');
});

// Route to render the login form with error message (if any)
router.get('/login', function (req, res, next) {
  res.render('login', { message: req.flash('error') });
});

// Route to render the profile page
router.get('/profile', isLoggedin, (req, res) => {
  // Retrieve user data from the database based on the user ID (req.user._id)
  UserModel.findById(req.user._id)
    .then((userData) => {
      // If user data is found, render the profile page with user data
      if (userData) {
        res.render('profile', {
          username: userData.username,
          userId: req.user.userId // Assuming userId is part of the user object
          // Add other properties as needed
        });
      } else {
        // If user data is not found, handle the error (e.g., redirect to an error page)
        res.status(404).send('User data not found');
      }
    })
    .catch((err) => {
      // Handle errors (e.g., database error)
      console.error('Error fetching user data:', err);
      res.status(500).send('Internal server error');
    });
});

// Route to register a new user
router.post('/register', (req, res) => {
  const userId = uuid.v4(); // Generate a UUID for the user ID
  const UserData = new UserModel({
    username: req.body.username,
    email: req.body.email,
    userId: userId // Set the userId field
  });

  // Register the user using UserModel.register()
  UserModel.register(UserData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      });
    })//This above code does the same operation as user.save()
    .catch(function (err) {
      // Handle registration errors
      console.error("Error registering user:", err);
      res.render("register", { error: err.message });
    });
});

// Route to handle user login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true // Enable flash messages for authentication failures
}));

// Route to handle user logout
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

// Middleware to check if user is logged in
function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;


