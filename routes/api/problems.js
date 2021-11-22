const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Problem = require("../../models/Problem");

router.get("/", (req, res) => {
    Problem.find({})
        .then(problemResult => {
            const problemsById = {};
            
            problemResult.forEach(problem => {
              
              problemsById[problem.id] = problem;
            });
            const allProblemsId = Object.keys(problemsById);
            res.json({problemsById, allProblemsId})
        })
        .catch(err =>
            res.status(404).json({ noProblemFound: "No problems available" })
        );
});

router.get("/:id", (req, res) => {
    const document = Problem.findById(req.params.id)
        .then(result => res.json(result))
        .catch(err =>
            res.status(404).json({
                noProblemFound: "No problem found with that ID"
            })
        );
});



module.exports = router;