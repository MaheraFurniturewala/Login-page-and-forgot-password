const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users_controller');
const passport = require('passport');

router.get('/sign_up',users_controller.sign_up);
router.get('/sign_in',users_controller.sign_in);
router.post('/create',users_controller.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), users_controller.create_session);
router.get('/profile/:id',passport.checkAuthentication,users_controller.profile);
router.get('/sign_out',users_controller.log_out);
router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/sign_in' }),users_controller.create_session);
module.exports = router;