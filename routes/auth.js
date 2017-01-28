const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

//finds the path /register, calls helper and redirect function, then renders the file in auth/register
router.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});


//creates a new user by calling createUser
router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req,res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({status: 'error'}); })
});

//gets the login page
router.get('/login', authHelpers.loginRedirect, (req, res)=> {
  res.render('auth/login');
});

//post requrest when user logs in. passport checks for us and redirects as necessary.
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

//route when user is logged out.
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
