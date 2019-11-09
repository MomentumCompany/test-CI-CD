const Router = require('express').Router(),
    controller = require('../controllers/user-controller');

//Register route
Router.post('/Register', (req, res) => {
   let ctx = controller.Register(req.body);
    ctx(req, res);
});

//Login route
Router.post('/Login', (req, res) => {
   let ctx = controller.Login(req.body);
    ctx(req, res);
});

module.exports = Router;
