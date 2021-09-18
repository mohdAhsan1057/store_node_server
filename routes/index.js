
const router = require('express').Router();
const userRoute = require('./routes/userRoute');

router.get('/', (req, res) => res.send('Welcome to Human Resource Management Server Api'));
router.use('/user', userRoute);

module.exports = router;