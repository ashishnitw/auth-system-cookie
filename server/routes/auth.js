const router = require('express').Router();

// controllers
const { register, login } = require('../controllers/auth-controller');

router.post('/register', register);
router.post('/login', login);

module.exports = router;