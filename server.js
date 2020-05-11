require('dotenv').config();

const express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    session = require('express-session'), 
    fileUpload = require('express-fileupload'),
    app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    { chatNow } = require('./routes/chat');

app.use(express.static(__dirname + '/public'));

// Passport Config
require('./config/passport')(passport);

// DB Config
// const clouddb = require('./config/keys').mongoURI;
const localdb = 'mongodb://localhost:27017/adminpanel';
// Connect to MongoDB
mongoose
  .connect(localdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));


// View engine setup
app.set('view engine', 'ejs');

// Setup Bodyparser middleware 
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express Session configuration
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
// app.get('/', (req, res) => res.sendFile(__dirname + '/public/html/chat.html'));
app.use('/user', require('./routes/user.js'));
app.use('/admin', require('./routes/admin.js'));

// For chat application passing io instance
chatNow(io);

const PORT = process.env.PORT || 4000;

// Port start
server.listen(PORT, () => {
  console.log(`Server running on port #${PORT}`);
});
