const express = require("express");
const actions = require("../data/helpers/actionModel");

const router = express.Router();

// "/" = "/projects/:id/actions"
router.get("/", (req, res) => {
  res.json({
    message: "This is the action router",
  });
});

// GET action by id
router.get("/:projectId", (req, res) => {
  actions
    .get(req.params.projectId)
    .then((id) => {
      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({
          message: "That action does not exist.",
        });
      }
    })
    .catch((err) => {
      console.logg(err);
      res.status(500).json({
        error: "There was an error retrieving that project's actions.",
      });
    });
});

module.exports = router;
