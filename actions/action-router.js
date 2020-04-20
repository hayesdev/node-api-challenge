const express = require("express");
const actions = require("../data/helpers/actionModel");

const router = express.Router();

// "/" = "/projects/:id/actions"
// router.get("/", (req, res) => {
//   res.json({
//     message: "This is the action router",
//   });
// });

// GET action by id
router.get("/:actionId", (req, res) => {
  actions
    .get(req.params.actionId)
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

// POST add new action
router.post("/:actionId", (req, res) => {
  if (
    !req.params.id ||
    !req.body.description ||
    req.body.description.length > 128
  ) {
    return res.status(400).json({
      message: "Please provide a valid description for this action.",
    });
  }
  actions
    .insert(req.body)
    .then((project) => {
      if (project) {
        res.status(201).json({
          message: "Action created!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error creating the action.",
      });
    });
});

// PUT edit project
router.put("/:actionId", (req, res) => {
  if (!req.params.actionId || !req.body) {
    return res.status(404).json({
      message: "That action does not exist",
    });
  }
  actions
    .update(req.params.actionId, req.body)
    .then((changes) => {
      if (changes) {
        res.status(201).json({
          message: "Action updated!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Could not update that action.",
      });
    });
});

// DELETE
router.delete("/:actionId", (req, res) => {
  //   if (!req.body) {
  //     res.status(404).json({
  //       message: "That project does not exist",
  //     });
  //   }
  actions
    .remove(req.params.actionId)
    .then((action) => {
      if (action > 0) {
        res.status(200).json({
          message: "Action has been removed.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Error removing the action.",
      });
    });
});

module.exports = router;
