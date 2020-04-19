const express = require("express");
const actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "This is the action router",
  });
});

module.exports = router;
