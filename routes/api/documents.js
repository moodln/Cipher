const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Document = require('../../models/Document');
const validateDocumentInput = require('../../validation/documents')


router.get('/:id', (req, res) => {
    Document.findById(req.params.id)
        .then(document => res.json(document))
        .catch(err =>
            res.status(404).json({ noDocumentFound: 'No document found with that ID' })
        );
});

router.put('/:id', (req, res) => {
    Document.updateOne({id: req.params.id}, {
        
        $set: {
            body: req.body.body,
            problem: req.problem.id,
            date: Date.now
        },
    })
        .then(res => {
            const { matchedCount, modifiedCount } = result;
            if (matchedCount && modifiedCount) {
                console.log('successfully added a new document')
            }
        })
        .catch(err =>
            res.status(404).json({ noDocumentFound: 'No document found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateDocumentInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newDocument = new Document({
        body: req.body.body,
        problem: req.problem.id
      });
  
      newDocument.save().then(document => res.json(document));
    }
);

module.exports = router;