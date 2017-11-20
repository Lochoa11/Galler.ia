const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const keys = require('./config/keys');
const passport = require('./middlewares/authentication');
const models = require('./models');
const viewHelpers = require('./middlewares/viewHelpers');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable sessions & passport
app.use(expressSession(({ secret: 'keyboard cat', resave: false, saveUninitialized: true })));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(
//   new GoogleStrategy({
//     clientID: keys.googleClientID,
//     clientSecret: keys.googleClientSecret,
//     callbackURL: '/auth/google/callback'
//   },
//   (accessToken, refreshToken, profile, done) =>{
//     console.log('access token', accessToken);
//     console.log('refresh token', refreshToken);
//     console.log('profile', profile);
//   })
// );

// app.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));

// app.get('/auth/google/callback', passport.authenticate('google'));

app.use(express.static('./public'));

// Handlebars config
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);
app.use(viewHelpers.register());

// Load up all of the controllers
const controllers = require('./controllers');
app.use(controllers);


// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`);
    });
  });
