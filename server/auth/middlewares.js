const jwt = require('jsonwebtoken');

function checkTokenSetUser(req, res, next) {
    const authHeader = req.get('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            console.log(token);
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                }
                req.user = user;
                next();
            });
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports = {checkTokenSetUser};