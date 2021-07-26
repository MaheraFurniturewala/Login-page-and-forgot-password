const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users_controller');

router.get('/sign_up',users_controller.sign_up);
router.get('/sign_in',users_controller.sign_in);
router.post('/create',users_controller.create);
router.post('/create-session',users_controller.create_session)

module.exports = router;