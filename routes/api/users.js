const express = require("express");
const router = express.Router();
const passport = require('passport');
const { getCurrUserGroups } = require("../../controllers/groups_controller");


const { registerUser, loginUser, currentUser } = require("../../controllers/users_controller");


router.post('/register', registerUser);
router.post('/login', loginUser)

router.post('/current', passport.authenticate('jwt', {session: false}), currentUser)

router.get("/groups", passport.authenticate('jwt', {session: false}), getCurrUserGroups)

module.exports = router;