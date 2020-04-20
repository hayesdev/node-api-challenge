const express = require("express");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

// GET get all projects
// router.get("/", (req, res)=> {
//     projects
//     .get()
//     .then((projects)=>{
//         res.status(200).json(projects)
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).json({
//             error: "Error retrieving projects."
//         })
//     })
// });

// GET by id
router.get("/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((id) => {
      if (id) {
        res.status(200).json(id);
      } else {
        return res.status(404).json({
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

// GET finding project actions
router.get("/:id/actions", (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then((project) => {
      if (project.length) {
        return res.status(400).json({
          message: "This project has no actions.",
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error retrieving this project's actions.",
      });
    });
});

// POST new project
router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
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
router.put("/:id", (req, res) => {
  if (!req.params.id || !req.body) {
    return res.status(404).json({
      message: "That project ID does not exist",
    });
  }
  projects
    .update(req.params.id, req.body)
    .then((changes) => {
      if (changes) {
        res.status(201).json({
          message: "Project updated!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Could not update that project.",
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  //   if (!req.body) {
  //     res.status(404).json({
  //       message: "That project does not exist",
  //     });
  //   }
  projects
    .remove(req.params.id)
    .then((project) => {
      if (project > 0) {
        res.status(200).json({
          message: "Project has been removed.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error removing the project.",
      });
    });
});

module.exports = router;
