const express = require("express");
const router = express.Router();
const passport = require('passport');


const { createInvite, deleteInvite } = require("../../controllers/invites_controller");


router.post('/', passport.authenticate('jwt', {session: false}), createInvite);
router.get('/:inviteId', passport.authenticate('jwt', {session: false}), deleteInvite);

module.exports = router;