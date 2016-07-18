import express from 'express';
import path from 'path';
import serverConfig from './server-config';
import db from './db/db';
import passport from 'passport';
import {facebookAuthConfig} from './auth/auth';

const app = express();
const port = process.env.PORT || 8000;

serverConfig(app, express, passport, db);
facebookAuthConfig(db.findUser, db.createUser);

// Render the main splash page upon arrival
app.get('/', (req, res) => {
  console.log('redirected back');
  // res.sendFile(path.join(__dirname, './views/splash.html'));
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/login', (req, res) => {
  res.redirect('/spots');
});

// route for facebook authentication and login
// different scopes while logging in
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' }
));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/spots');
  });

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Get all of a user's spots.
app.get('/spots', function(req, res) {
  console.log('redirected to spots');
  res.sendFile(path.join(__dirname, './views/spots.html')); // index.html for react app
});

// RESTFUl API for retrieving spots from the db
app.get('/api/spots', db.getAllSpots);
app.get('/api/spots/:id', db.getSingleSpot);
app.post('/api/spots', db.createSpot);
app.put('/api/spots/:id', db.updateSpot);
app.delete('/api/spots/:id', db.removeSpot);


app.listen(port, () => {
  console.log('server started on port');
});
