const express = require("express");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

// "/" = "/projects"
router.get("/", (req, res) => {
  res.json({
    message: "This is the project router",
  });
});

router.get("/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((id) => {
      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({
          message: "That project ID does not exist",
        });
      }
    })
    .catch((err) => {
      console.logg(err);
      res.status(500).json({
        error: "There was an error retrieving that project",
      });
    });
});

module.exports = router;
