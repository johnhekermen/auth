const express = require('express');

const router = express.Router();
// any router in here is pre-pended with /auth/
router.get('/', (req, res) => {
    res.json({
        message: 'locked'
    });
});

router.post('/signup', (req, res) => {
    const data = req.body;
    console.log(data);
    
    res.json({
        message: 'signup page'
    });
});

module.exports = router;