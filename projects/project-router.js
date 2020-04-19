const express = require("express");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "This is the project router",
  });
});

module.exports = router;
