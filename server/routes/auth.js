const router = require('express').Router();

// controllers
const { register, login, logout, currentUser } = require('../controllers/auth-controller');
const { requireSignin } = require('../middlewares');

router.post('/register', register);
router.post('/login', login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;