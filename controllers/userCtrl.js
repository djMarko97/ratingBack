const passport = require('passport');
const User = require('../models/user');

exports.createUser = (req, res, next) => {

    if (req.body.fullname === undefined || req.body.email === undefined || req.body.password === undefined) {
        return res.status(200).json({ error: 'You cannot sadasdsasubmit empty fields' });
    }

    if (req.body.fullname === '' || req.body.email === '' || req.body.password === '') {
        return res.status(200).json({ error: 'You cannot submit asdasdasempty fields' });
    }


    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.status(200).json({ error: err });
        }
        if (info) {
            return res.status(200).json({ error: info });
        }

        return res.status(201).json({ message: 'User successfully created', user: user });
    })(req, res, next);
}

exports.loginUser = (req, res, next) => {

    if (req.body.email === undefined || req.body.password === undefined) {
        return res.status(200).json({ error: 'You cannot submit empty fields' });
    }

    if (req.body.email === '' || req.body.password === '') {
        return res.status(200).json({ error: 'You cannot submit empty fields' });
    }


    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            return res.status(200).json({ error: err });
        }
        if (info) {
            return res.status(200).json({ error: info });
        }

        return res.status(201).json({ message: 'User login successful', user: user });
    })(req, res, next);
}

exports.homePage = async (req, res) =>{
    const result = await User.findOne({'email': req.params.email}, {'password': 0})
                                .populate("gyms.gym")

    return res.status(200).json({user: result});
}