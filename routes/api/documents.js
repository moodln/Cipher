const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;

const Document = require('../../models/Document');
const validateDocumentInput = require('../../validation/documents')


router.get('/:id', (req, res) => {
    const document = Document.findById(req.params.id)
        .then(result => res.json(result))
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
        // problem: req.problem.id
      });
  
      newDocument.save().then(document => res.json(document));
    }
);

router.put('/:id', (req, res) => {
    
    Document.updateOne({'_id': ObjectId(req.params.id).toString()}, {  
        $set: {
            body: req.body.body
        },
    })
        .then(result => {
            if (result.modifiedCount > 0) {
                res.json('successfully updated')
            } else {
                res.json('nothing was modified in this document')
        }})
        .catch(err =>
            res.status(404).json({ noDocumentFound: 'No document found with that ID' })
        );
});

router.delete('/:id', (req, res) => {
    const document = Document.findById(req.params.id)
    Document.remove(document)
        .then(result => res.json(result))
        .catch(err => res.json(err))
});


module.exports = router;