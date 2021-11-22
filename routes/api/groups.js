const express = require("express");
const router = express.Router();
const passport = require("passport");


const { createGroup, retrieveGroup } = require("../../controllers/groups_controller");


router.post("/", passport.authenticate("jwt", {session: false}), createGroup);
router.get("/:groupId", passport.authenticate("jwt", {session: false}), retrieveGroup);

module.exports = router;