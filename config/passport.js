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

// Detects environment
const isProduction = process.env.NODE_ENV === "production";

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: isProduction
        ? "https://fitbit001.onrender.com/auth/google/callback"
        : "http://localhost:4000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {

      // DEBUG LOGS
      console.log("----- GOOGLE DEBUG -----");
      console.log("NODE_ENV:", process.env.NODE_ENV);
      console.log(
        "CALLBACK URL BEING USED:",
        isProduction
          ? "https://fitbit001.onrender.com/auth/google/callback"
          : "http://localhost:4000/auth/google/callback"
      );
      console.log("-------------------------");

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

      callbackURL: isProduction
        ? "https://fitbit001.onrender.com/auth/github/callback"
        : "http://localhost:4000/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = passport;

