const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Document = require('../../models/Document');


router.get('/', (req, res) => {
    Document.find()
        .sort({ date: -1 })
        .then(documents => res.json(documents))
        .catch(err => res.status(404).json({ noDocumentsFound: 'No documents found' }));
});

// router.get('/user/:user_id', (req, res) => {
//     Tweet.find({user: req.params.user_id})
//         .then(tweets => res.json(tweets))
//         .catch(err =>
//             res.status(404).json({ notweetsfound: 'No tweets found from that user' }
//         )
//     );
// });

router.get('/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No tweet found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateTweetInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newTweet = new Tweet({
        text: req.body.text,
        user: req.user.id
      });
  
      newTweet.save().then(tweet => res.json(tweet));
    }
);

module.exports = router;