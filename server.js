const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers'); // Import routes
const sequelize = require('./config/connection'); // Import sequelize connection
const homeRoutes = require('./controllers/homeRoutes');
const dashboardRoutes = require('./controllers/dashboardRoutes');
const authRoutes = require('./controllers/authRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js engine without custom helpers
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static files
app.use(express.static('public'));

// Set up session with Sequelize store
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: false,
}));

// Use the imported routes
app.use(routes);
app.use('/', homeRoutes);
app.use('/', dashboardRoutes);
app.use('/', authRoutes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
