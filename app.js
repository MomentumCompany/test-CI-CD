const app = require('express')(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongo = require('mongoose'),
    user = require('./lib/routes/user-routes');

// middlewares to run the application
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.use('/api/user',user);

//default route to hit
app.use('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname})
});

module.exports = app;
