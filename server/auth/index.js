const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const db = require('../db/connection.js');
const users = db.get('users');

users.createIndex('username', { unique: true }); // define an index to collection

const router = express.Router();

const schema = Joi.object().keys({ // validation schema
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(), 
    password: Joi.string().min(6).required()
});

// any router in here is pre-pended with /auth/
router.get('/', (req, res) => { // http://localhost:5000/auth/
    res.json({
        message: 'locked'
    });
});

router.post('/signup', (req, res, next) => { // http://localhost:5000/auth/signup/
    const result = Joi.validate(req.body, schema); // validate req body
    if (result.error === null){ // move on database validation if matches the schema
        users.findOne({ // check database to see if already have this user
            username: req.body.username
        }).then(user => {
            if (user) { // already a user in db with this username
                const error = new Error('This username is not OG');
                next(error); // call next route which is error handler
            } else { //move on to password hashing
                bcrypt.hash(req.body.password, 12).then(hashedPassword => {
                    const newUser = { // create an user object with username and hashed password
                        username: req.body.username,
                        password: hashedPassword
                    };
                    users.insert(newUser).then(insertedUser => { // insert user object to database
                        delete insertedUser.password;
                        res.json(insertedUser);
                    });
                });
            }
        });
    } else { // calling next with validation result if theres an error 
        next(result.error);
    }
});

module.exports = router;