const express = require("express");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

// "/" = "/projects"
// router.get("/", (req, res) => {
//   res.json({
//     message: "This is the project router",
//   });
// });

// GET by id
router.get("/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((id) => {
      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({
          message: "That project ID does not exist.",
        });
      }
    })
    .catch((err) => {
      console.logg(err);
      res.status(500).json({
        error: "There was an error retrieving that project.",
      });
    });
});

// POST create new project
router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "Please provide a name and description for this project.",
    });
  }
  projects
    .insert(req.body)
    .then((project) => {
      if (project) {
        res.status(201).json({
          message: "Project created!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error creating this project.",
      });
    });
});

// PUT edit project
// router.put("/:id", (req, res) => {
//   if (!req.params.id) {
//     res.status(404).json({
//       message: "That project ID does not exist",
//     });
//   }
//   projects.update();
// });

module.exports = router;
