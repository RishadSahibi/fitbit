// src/config/passport.js
require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

// Debug check
console.log("GOOGLE ID:", process.env.GOOGLE_CLIENT_ID);

// SESSION HANDLERS
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// GITHUB STRATEGY
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = passport;
