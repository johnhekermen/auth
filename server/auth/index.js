const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const db = require('../db/connection.js');
const users = db.get('users');
// users.index('username');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(), 
    password: Joi.string().min(6).required()
});

// any router in here is pre-pended with /auth/
router.get('/', (req, res) => {
    res.json({
        message: 'locked'
    });
});

router.post('/signup', (req, res, next) => {
    // const data = req.body;
    // console.log(data);
    const result = Joi.validate(req.body, schema);
    if (result.error === null){
        //check database
        users.findOne({
            username: req.body.username
        }).then(user => {
            if (user) {
                // already a user in db with this username
                const error = new Error('This username is not OG');
                next(error);
            } else {
                //hash password and insert
                bcrypt.hash(req.body.password, 12).then(hashedPassword => {
                    // res.json({ hashedPassword });
                    // insert the user in database
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword
                    };
                    users.insert(newUser).then(insertedUser => {
                        res.json(insertedUser);
                    });
                });
            }
            // res.json({ user });
        });
    } else {
        next(result.error);
    }
});

module.exports = router;