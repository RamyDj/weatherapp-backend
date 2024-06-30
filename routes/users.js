var express = require('express');
var router = express.Router();

const User = require('../models/users');
const { checkBody } = require("../modules/checkBody");



router.post('/signup', (req, res) => {
    const existingUser = User.findOne({ email: req.body.email });
    if (!checkBody(req.body, ["name", "email", "password"])) {
        res.json({ result: false, error: 'Missing or empty fields' })
    } else if (existingUser) {
        res.json({ result: false, error: 'User already exists' })
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        newUser.save().then(() => {
            res.json({ result: true });
        });
    }

});

router.post('/signin', (req, res) => {
    if (!checkBody(req.body, ["email", "password"])) {
        res.json({ result: false, error: 'Missing or empty fields' })
        return
    }

    User.findOne({ email: req.body.email, password: req.body.password }).then(data => {
        if (data) {
            res.json({ result: true });
        } else {
            res.json({ result: false, error: "User not found" });
        }
    })
})

module.exports = router;
