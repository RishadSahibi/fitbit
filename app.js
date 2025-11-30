// src/app.js
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// connect to DB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB connection error:', err));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static
app.use(express.static(path.join(__dirname, '..', 'public')));

// ------------------------------
// SESSION + PASSPORT MIDDLEWARE
// ------------------------------
app.use(
  session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Makes user available in views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ------------------------------
// ROUTES
// ------------------------------
const authRouter = require('./routes/auth');
const workoutsRouter = require('./routes/workouts');

app.use('/auth', authRouter);
app.use('/workouts', workoutsRouter);

// splash/home route
app.get('/', (req, res) => {
  res.render('index'); // splash page
});

// login page
app.get('/login', (req, res) => {
  res.render('login'); // must create views/login.ejs
});

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
